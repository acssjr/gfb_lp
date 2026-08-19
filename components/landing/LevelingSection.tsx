"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Select } from "@base-ui/react/select";
import gsap from "gsap";
import { levelingSteps, whatsappMessages } from "@/content/siteContent";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { trackEvent } from "@/lib/analytics";
import styles from "@/components/landing/Landing.module.css";

const levels = ["básico", "intermediário", "avançado"] as const;
const journeyLevels = ["iniciante", "básico", "intermediário", "avançado"] as const;
const levelOptions = levels.map((value) => ({
  value,
  label: value[0].toUpperCase() + value.slice(1),
}));

gsap.registerPlugin(useGSAP);

export function LevelingSection() {
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState<(typeof levels)[number]>("básico");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const journeyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (context, contextSafe) => {
      const root = journeyRef.current;
      if (!root) return;

      let timeline: gsap.core.Timeline | undefined;
      let media: gsap.MatchMedia | undefined;
      let cancelled = false;

      const buildMorph = contextSafe!(() => {
        if (cancelled) return;

        const frame = root.querySelector<HTMLElement>("[data-level-morph-frame]");
        const words = Array.from(root.querySelectorAll<HTMLElement>("[data-level-word]"));
        const markers = Array.from(root.querySelectorAll<HTMLElement>("[data-level-marker]"));
        if (!frame || words.length === 0) return;

        const measurementCanvas = document.createElement("canvas");
        const measurementContext = window.navigator.userAgent.includes("jsdom")
          ? null
          : measurementCanvas.getContext("2d");
        const widths = words.map((word) => {
          const computed = window.getComputedStyle(word);
          const text = word.textContent ?? "";
          const tracking = Number.parseFloat(computed.letterSpacing) || 0;
          if (!measurementContext) return Math.ceil(word.offsetWidth) + 3;

          measurementContext.font = [
            computed.fontStyle,
            computed.fontWeight,
            computed.fontSize,
            computed.fontFamily,
          ].join(" ");

          return Math.ceil(measurementContext.measureText(text).width + tracking * (text.length - 1)) + 3;
        });
        media = gsap.matchMedia();
        media.add(
          {
            animate: "(prefers-reduced-motion: no-preference)",
            reduce: "(prefers-reduced-motion: reduce)",
          },
          ({ conditions }) => {
            const reduce = Boolean(conditions?.reduce);

            gsap.set(words, { autoAlpha: 0 });
            gsap.set(words[0], { autoAlpha: 1 });
            gsap.set(frame, { width: widths[0] });
            gsap.set(markers, { scaleX: 0, transformOrigin: "left center" });
            gsap.set(markers[0], { scaleX: 1 });

            if (reduce) return;

            const activeTimeline = gsap.timeline({ repeat: -1 });
            timeline = activeTimeline;

            words.forEach((word, index) => {
              const nextIndex = (index + 1) % words.length;
              const nextWord = words[nextIndex];
              const currentChars = word.querySelectorAll<HTMLElement>("[data-level-char]");
              const nextChars = nextWord.querySelectorAll<HTMLElement>("[data-level-char]");
              const transitionAt = `level-${index}`;
              const frameScale = widths[index] / widths[nextIndex];
              const wordCounterScale = 1 / frameScale;

              activeTimeline
                .to(markers[index], { scaleX: 1, duration: 1.15, ease: "none" })
                .addLabel(transitionAt)
                .set(nextWord, { autoAlpha: 1 }, transitionAt)
                .set(frame, {
                  width: widths[nextIndex],
                  scaleX: frameScale,
                  transformOrigin: "left center",
                }, transitionAt)
                .set([word, nextWord], {
                  scaleX: wordCounterScale,
                  transformOrigin: "left center",
                }, transitionAt)
                .set(nextChars, {
                  autoAlpha: 0,
                  rotationY: 58,
                  scale: 0.94,
                  x: (characterIndex) => {
                    const center = (nextChars.length - 1) / 2;
                    return (characterIndex - center) * 7;
                  },
                }, transitionAt)
                .to(frame, {
                  scaleX: 1,
                  duration: 0.5,
                  ease: "power3.inOut",
                }, transitionAt)
                .to([word, nextWord], {
                  scaleX: 1,
                  duration: 0.5,
                  ease: "power3.inOut",
                }, transitionAt)
                .to(currentChars, {
                  autoAlpha: 0,
                  rotationY: -48,
                  scale: 0.96,
                  x: (characterIndex) => {
                    const center = (currentChars.length - 1) / 2;
                    return (center - characterIndex) * 5;
                  },
                  duration: 0.28,
                  ease: "power3.inOut",
                  stagger: { each: 0.018, from: "center" },
                }, transitionAt)
                .to(nextChars, {
                  autoAlpha: 1,
                  rotationY: 0,
                  scale: 1,
                  x: 0,
                  duration: 0.48,
                  ease: "power3.out",
                  stagger: { each: 0.018, from: "center" },
                }, `${transitionAt}+=0.08`)
                .set(word, { autoAlpha: 0 })
                .set(markers[index], { scaleX: 0 })
                .set(markers[nextIndex], { scaleX: 0 });
            });
          },
        );
      });

      void (document.fonts?.ready ?? Promise.resolve()).then(buildMorph);

      return () => {
        cancelled = true;
        timeline?.kill();
        media?.revert();
      };
    },
    { scope: journeyRef },
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let backdropFrame = 0;

    animationRef.current?.cancel();

    const finishClose = () => {
      if (cancelled) return;
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
      dialog.dataset.motionState = "closed";
      triggerRef.current?.focus();
    };

    if (open) {
      if (!dialog.open) {
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
      }

      backdropFrame = window.requestAnimationFrame(() => {
        if (!cancelled) dialog.dataset.motionState = "open";
      });
      if (reducedMotion || typeof dialog.animate !== "function") {
        return;
      }

      const animation = dialog.animate(
        [
          { opacity: 0, transform: "translateY(12px) scale(0.97)" },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ],
        {
          duration: 250,
          easing: "cubic-bezier(0.23, 1, 0.32, 1)",
          fill: "both",
        },
      );
      animationRef.current = animation;
      animation.finished.catch(() => undefined);

      return () => {
        cancelled = true;
        window.cancelAnimationFrame(backdropFrame);
        animation.cancel();
      };
    }

    if (!dialog.open) {
      dialog.dataset.motionState = "closed";
      return;
    }

    dialog.dataset.motionState = "closing";
    if (reducedMotion || typeof dialog.animate !== "function") {
      finishClose();
      return;
    }

    const animation = dialog.animate(
      [
        { opacity: 1, transform: "translateY(0) scale(1)" },
        { opacity: 0, transform: "translateY(12px) scale(0.97)" },
      ],
      {
        duration: 180,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)",
        fill: "both",
      },
    );
    animationRef.current = animation;
    animation.finished.then(finishClose).catch(finishClose);

    return () => {
      cancelled = true;
      animation.cancel();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [open]);

  function openDialog() {
    setOpen(true);
    trackEvent("leveling_info_opened", { user_intent: "leveling" });
  }

  function closeDialog() {
    setOpen(false);
  }

  return (
    <section id="nivelamento" className={styles.levelingSection} aria-labelledby="leveling-title">
      <div className={styles.levelingIntro} data-reveal>
        <div className={styles.levelingKickerRow}>
          <p className={styles.kicker}>JÁ DANÇA?</p>
          <span className={styles.levelingRibbon}>Nivelamento gratuito</span>
        </div>
        <h2 id="leveling-title">Está vindo de outra escola?</h2>
        <p>
          Cada escola possui seu próprio ritmo de ensino. Faça o nivelamento para entender
          como a sua dança se encaixa na metodologia GFB.
        </p>
        <button
          ref={triggerRef}
          className={styles.secondaryButtonLight}
          type="button"
          onClick={openDialog}
        >
          Como funciona o nivelamento?
        </button>
      </div>

      <div ref={journeyRef} className={styles.levelingJourney} data-leveling-selector>
        <p>Encontre a turma que acompanha a sua dança</p>
        <div className={styles.levelingWordStage} aria-hidden="true">
          <div className={styles.levelingWordMorph} data-level-morph data-level-morph-frame>
            {journeyLevels.map((item, index) => (
              <strong key={item} data-level-word data-level-first={index === 0 ? "true" : undefined}>
                {Array.from(item).map((character, characterIndex) => (
                  <span key={`${item}-${characterIndex}`} data-level-char>
                    {character}
                  </span>
                ))}
              </strong>
            ))}
          </div>
        </div>
        <p className={styles.srOnly}>Níveis: iniciante, básico, intermediário e avançado.</p>
        <div className={styles.levelingMarkers} aria-hidden="true">
          {journeyLevels.map((item) => <span key={item} data-level-marker />)}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className={styles.levelingDialog}
        data-motion-state="closed"
        aria-labelledby="leveling-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClose={() => {
          setOpen(false);
          if (dialogRef.current) dialogRef.current.dataset.motionState = "closed";
        }}
      >
        <div className={styles.dialogHeader}>
          <div>
            <p className={styles.kicker}>ENCONTRE SUA TURMA</p>
            <h2 id="leveling-dialog-title">Como funciona o nivelamento</h2>
          </div>
          <button type="button" className={styles.closeButton} onClick={closeDialog} aria-label="Fechar nivelamento">
            ×
          </button>
        </div>

        <ol className={styles.levelingSteps}>
          {levelingSteps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>

        <div className={styles.dialogAction}>
          <div>
            <strong>Um encontro cuidadoso, não uma prova.</strong>
            <Select.Root
              items={levelOptions}
              value={level}
              onValueChange={(value) => setLevel(value as (typeof levels)[number])}
            >
              <Select.Label className={styles.levelSelectLabel}>Nível pretendido</Select.Label>
              <Select.Trigger className={styles.levelSelectTrigger}>
                <span className={styles.levelSelectCurrent} aria-hidden="true">Sua escolha</span>
                <Select.Value className={styles.levelSelectValue} />
                <Select.Icon className={styles.levelSelectIcon}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal container={dialogRef}>
                <Select.Positioner
                  className={styles.levelSelectPositioner}
                  alignItemWithTrigger={false}
                  align="start"
                  sideOffset={7}
                >
                  <Select.Popup className={styles.levelSelectPopup} data-level-select-popup>
                    <p className={styles.levelSelectHeading}>Onde sua dança está hoje?</p>
                    <Select.List className={styles.levelSelectList}>
                      {levelOptions.map((option, index) => (
                        <Select.Item
                          key={option.value}
                          value={option.value}
                          className={styles.levelSelectItem}
                        >
                          <span className={styles.levelSelectNumber} aria-hidden="true">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <Select.ItemText className={styles.levelSelectItemText}>
                            {option.label}
                          </Select.ItemText>
                          <Select.ItemIndicator className={styles.levelSelectIndicator}>
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="m5 12 4 4L19 6" />
                            </svg>
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.List>
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>
          </div>
          <WhatsAppLink
            className={styles.primaryButton}
            message={whatsappMessages.leveling(level)}
            tracking={{
              ctaLocation: "leveling_dialog",
              userIntent: "leveling",
              levelIntended: level,
              intentEvent: "leveling_whatsapp_started",
            }}
          >
            Agendar nivelamento
          </WhatsAppLink>
        </div>
      </dialog>
    </section>
  );
}
