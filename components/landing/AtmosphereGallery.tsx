"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { atmosphereFrames } from "@/content/siteContent";
import { visualAssets } from "@/config/visualAssets";
import styles from "@/components/landing/Landing.module.css";

gsap.registerPlugin(useGSAP);

export type AtmosphereOrientation = "landscape" | "portrait" | "square";

export function shouldRestoreAtmospherePosition(
  previous: AtmosphereOrientation,
  next: AtmosphereOrientation,
  mobile: boolean,
) {
  return mobile && previous === "portrait" && next !== "portrait";
}

export function AtmosphereGallery() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<number | null>(null);
  const previousOrientationRef = useRef<AtmosphereOrientation>(
    atmosphereFrames[0].orientation,
  );
  const loopFrame = atmosphereFrames[0];
  const loopAsset = visualAssets[loopFrame.asset];

  function select(index: number, fromInteraction = true) {
    if (fromInteraction) setAutoplay(false);
    setActive((index + atmosphereFrames.length) % atmosphereFrames.length);
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(mediaQuery.matches);
    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "220px 0px", threshold: 0.08 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || !inView || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % atmosphereFrames.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [autoplay, inView, reducedMotion]);

  useEffect(() => {
    const nextOrientation = atmosphereFrames[active].orientation;
    const restoreAfterResize = shouldRestoreAtmospherePosition(
      previousOrientationRef.current,
      nextOrientation,
      window.matchMedia("(max-width: 599px)").matches,
    );
    previousOrientationRef.current = nextOrientation;
    if (!restoreAfterResize) return;

    const timer = window.setTimeout(() => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const sectionBox = section?.getBoundingClientRect();
      if (!section || !viewport || !sectionBox) return;
      if (sectionBox.bottom <= 0 || sectionBox.top >= window.innerHeight) return;

      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const targetTop = Math.max(
        0,
        window.scrollY + viewport.getBoundingClientRect().top - headerHeight - 16,
      );
      root.style.scrollBehavior = "auto";
      window.scrollTo({ top: targetTop, behavior: "auto" });
      root.style.scrollBehavior = previousScrollBehavior;
    }, reducedMotion ? 0 : 650);

    return () => window.clearTimeout(timer);
  }, [active, reducedMotion]);

  useEffect(() => {
    const portraitLayout = window.matchMedia("(max-width: 599px) and (orientation: portrait)");
    const keepActiveFrameVisible = () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      if (!section || !viewport) return;

      const sectionBox = section.getBoundingClientRect();
      if (sectionBox.bottom <= 0 || sectionBox.top >= window.innerHeight) return;

      window.requestAnimationFrame(() => {
        viewport.scrollIntoView({
          block: "start",
          behavior: reducedMotion ? "auto" : "smooth",
        });
      });
    };

    portraitLayout.addEventListener("change", keepActiveFrameVisible);
    window.addEventListener("orientationchange", keepActiveFrameVisible);
    return () => {
      portraitLayout.removeEventListener("change", keepActiveFrameVisible);
      window.removeEventListener("orientationchange", keepActiveFrameVisible);
    };
  }, [reducedMotion]);

  useGSAP(
    () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      const slides = gsap.utils.toArray<HTMLElement>("[data-atmosphere-slide]");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const getTargetX = () => {
        const activeSlide = slides[active];
        if (!activeSlide) return 0;
        const centeredOffset =
          activeSlide.dataset.mediaOrientation === "portrait"
            ? Math.max(0, (viewport.clientWidth - activeSlide.offsetWidth) / 2)
            : 0;
        return -activeSlide.offsetLeft + centeredOffset;
      };

      const activeSlide = slides[active];
      const activeHeight = activeSlide?.scrollHeight ?? 0;

      const timeline = gsap.timeline({
        defaults: {
          duration: reducedMotion ? 0.16 : 0.56,
          ease: reducedMotion ? "power1.out" : "power3.inOut",
          overwrite: "auto",
        },
      });

      timeline.to(track, { x: getTargetX }, 0);

      if (activeHeight > 0) {
        timeline.to(
          viewport,
          { height: activeHeight, duration: reducedMotion ? 0.16 : 0.56 },
          0,
        );
      }

      timeline
        .to(
          slides,
          {
            autoAlpha: (index) => (index === active ? 1 : 0.48),
            scale: (index) => (index === active || reducedMotion ? 1 : 0.92),
            rotation: (index) =>
              index === active || reducedMotion ? 0 : index < active ? -1.2 : 1.2,
            stagger: reducedMotion ? 0 : 0.035,
          },
          0,
        )
        .to(
          "[data-atmosphere-media]",
          {
            scale: (index) => (index === active || reducedMotion ? 1.035 : 1.1),
          },
          0,
        );

      const caption = slides[active]?.querySelector("figcaption");
      if (caption) {
        timeline.fromTo(
          caption,
          { y: reducedMotion ? 0 : 12, autoAlpha: 0.45 },
          {
            y: 0,
            autoAlpha: 1,
            duration: reducedMotion ? 0.16 : 0.46,
            ease: "power3.out",
          },
          reducedMotion ? 0 : 0.34,
        );
      }

      if (typeof ResizeObserver !== "undefined") {
        const observer = new ResizeObserver(() => {
          gsap.set(track, { x: getTargetX() });
          const nextHeight = slides[active]?.scrollHeight;
          if (nextHeight) gsap.set(viewport, { height: nextHeight });
        });
        if (activeSlide) observer.observe(activeSlide);
        return () => observer.disconnect();
      }
    },
    { scope: sectionRef, dependencies: [active] },
  );

  return (
    <section
      id="ambiente-gfb"
      ref={sectionRef}
      className={styles.atmosphereSection}
      aria-labelledby="atmosphere-title"
    >
      <div className={styles.atmosphereTopline}>
        <SectionHeading
          kicker="POR DENTRO DAS AULAS"
          title="As aulas começam pelas bases e avançam com a desenvoltura da turma."
          text="Os professores e monitores orientam você de perto. Nas trocas de pares, dá para praticar sem ficar perdido."
          id="atmosphere-title"
        />
        <p className={styles.atmosphereCounter} aria-live="polite">
          <strong>{String(active + 1).padStart(2, "0")}</strong>
          <span>/ {String(atmosphereFrames.length).padStart(2, "0")}</span>
        </p>
      </div>

      <div
        className={styles.atmosphereCarousel}
        data-atmosphere-carousel
        data-active-format={atmosphereFrames[active].orientation}
        aria-roledescription="carrossel"
        aria-label="Registros do ambiente das aulas"
        onPointerDown={(event) => {
          pointerStart.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (pointerStart.current === null) return;
          const distance = event.clientX - pointerStart.current;
          pointerStart.current = null;
          if (Math.abs(distance) < 45) return;
          select(active + (distance < 0 ? 1 : -1));
        }}
        onFocusCapture={() => setAutoplay(false)}
      >
        <div ref={viewportRef} className={styles.atmosphereViewport}>
          <div ref={trackRef} className={styles.atmosphereTrack}>
            {atmosphereFrames.map((frame, index) => {
              const asset = frame.kind === "image" ? visualAssets[frame.asset] : null;
              const shouldLoadVideo = frame.kind === "video" && inView && index === active;
              return (
                <figure
                  key={frame.label}
                  className={styles.atmosphereSlide}
                  data-atmosphere-slide
                  data-active={index === active ? "true" : "false"}
                  data-media-orientation={frame.orientation}
                  aria-hidden={index !== active}
                >
                  <div
                    className={styles.atmosphereImageFrame}
                    data-media-kind={frame.kind}
                    data-media-orientation={frame.orientation}
                  >
                    {frame.kind === "video" ? (
                      <video
                        key={shouldLoadVideo ? "active" : "idle"}
                        className={styles.atmosphereVideo}
                        poster={frame.poster}
                        muted
                        loop
                        playsInline
                        preload="none"
                        autoPlay={shouldLoadVideo && !reducedMotion}
                        aria-label={frame.alt}
                        data-atmosphere-video
                        data-atmosphere-media
                      >
                        {shouldLoadVideo ? <source src={frame.src} type="video/mp4" /> : null}
                        Seu navegador não consegue reproduzir este vídeo.
                      </video>
                    ) : asset ? (
                      <Image
                        src={asset.src}
                        alt={asset.alt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 767px) 84vw, 68vw"
                        style={{
                          objectPosition:
                            "position" in asset && typeof asset.position === "string"
                              ? asset.position
                              : undefined,
                        }}
                        data-atmosphere-media
                      />
                    ) : null}
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <figcaption>
                    <strong>{frame.label}</strong>
                  </figcaption>
                </figure>
              );
            })}
            <figure
              className={`${styles.atmosphereSlide} ${styles.atmosphereLoopPreview}`}
              data-atmosphere-loop-preview
              data-media-orientation={loopFrame.orientation}
              aria-hidden="true"
            >
              <div
                className={styles.atmosphereImageFrame}
                data-media-kind={loopFrame.kind}
                data-media-orientation={loopFrame.orientation}
              >
                <Image
                  src={loopAsset.src}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(max-width: 767px) 84vw, 68vw"
                  style={{
                    objectPosition:
                      "position" in loopAsset && typeof loopAsset.position === "string"
                        ? loopAsset.position
                        : undefined,
                  }}
                />
                <span aria-hidden="true">01</span>
              </div>
              <figcaption>
                <strong>{loopFrame.label}</strong>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className={styles.atmosphereControls}>
          <div className={styles.atmosphereDots} aria-label="Escolher registro">
            {atmosphereFrames.map((frame, index) => (
              <button
                key={frame.label}
                type="button"
                aria-label={`Mostrar registro ${index + 1}`}
                aria-current={active === index ? "true" : undefined}
                onClick={() => select(index)}
              />
            ))}
          </div>
          <div className={styles.atmosphereArrows}>
            <button type="button" aria-label="Registro anterior" onClick={() => select(active - 1)}>
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" aria-label="Próximo registro" onClick={() => select(active + 1)}>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
