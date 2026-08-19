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

export function AtmosphereGallery() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<number | null>(null);

  function select(index: number, fromInteraction = true) {
    if (fromInteraction) setAutoplay(false);
    setActive((index + atmosphereFrames.length) % atmosphereFrames.length);
  }

  useEffect(() => {
    if (!autoplay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % atmosphereFrames.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [autoplay]);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      const slides = gsap.utils.toArray<HTMLElement>("[data-atmosphere-slide]");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const getTargetX = () => {
        const firstSlide = slides[0];
        if (!firstSlide) return 0;
        const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
        return -active * (firstSlide.getBoundingClientRect().width + gap);
      };

      const timeline = gsap.timeline({
        defaults: {
          duration: reducedMotion ? 0.16 : 0.56,
          ease: reducedMotion ? "power1.out" : "power3.inOut",
          overwrite: "auto",
        },
      });

      timeline
        .to(track, { x: getTargetX }, 0)
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
          "[data-atmosphere-slide] img",
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
        });
        observer.observe(track.parentElement ?? track);
        return () => observer.disconnect();
      }
    },
    { scope: sectionRef, dependencies: [active] },
  );

  return (
    <section
      ref={sectionRef}
      className={styles.atmosphereSection}
      aria-labelledby="atmosphere-title"
    >
      <div className={styles.atmosphereTopline}>
        <SectionHeading
          kicker="POR DENTRO DO GFB"
          title="A aula tem movimento, troca e gente por perto."
          text="Uma aula viva, com orientação próxima, trocas de pares e espaço para cada pessoa encontrar o próprio movimento."
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
        <div className={styles.atmosphereViewport}>
          <div ref={trackRef} className={styles.atmosphereTrack}>
            {atmosphereFrames.map((frame, index) => {
              const asset = visualAssets[frame.asset];
              return (
                <figure
                  key={frame.label}
                  className={styles.atmosphereSlide}
                  data-atmosphere-slide
                  data-active={index === active ? "true" : "false"}
                  aria-hidden={index !== active}
                >
                  <div className={styles.atmosphereImageFrame}>
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
                    />
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <figcaption>
                    <strong>{frame.label}</strong>
                    <span>{asset.caption}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        <div className={styles.atmosphereControls}>
          <div className={styles.atmosphereDots} aria-label="Escolher foto">
            {atmosphereFrames.map((frame, index) => (
              <button
                key={frame.label}
                type="button"
                aria-label={`Mostrar foto ${index + 1}`}
                aria-current={active === index ? "true" : undefined}
                onClick={() => select(index)}
              />
            ))}
          </div>
          <div className={styles.atmosphereArrows}>
            <button type="button" aria-label="Foto anterior" onClick={() => select(active - 1)}>
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" aria-label="Próxima foto" onClick={() => select(active + 1)}>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
