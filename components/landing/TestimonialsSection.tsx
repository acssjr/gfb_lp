import { SectionHeading } from "@/components/ui/SectionHeading";
import { IllustrativeImage } from "@/components/ui/IllustrativeImage";
import { testimonialThemes } from "@/content/siteContent";
import { visualAssets } from "@/config/visualAssets";
import styles from "@/components/landing/Landing.module.css";

export function TestimonialsSection() {
  return (
    <section className={styles.testimonialsSection} aria-labelledby="testimonials-title">
      <SectionHeading
        kicker="QUEM JÁ COMEÇOU"
        title="A dança muda quando você se permite começar."
        text="Histórias de quem chegou com insegurança, encontrou acolhimento e passou a viver o forró de outro jeito."
        id="testimonials-title"
        inverse
      />
      <IllustrativeImage
        asset={visualAssets.community}
        ratio="wide"
        className={styles.testimonialImage}
        sizes="100vw"
        depth="medium"
      />
      <div className={styles.testimonialGrid}>
        {testimonialThemes.map((theme, index) => (
          <article key={theme.title} data-reveal>
            <h3>{theme.title}</h3>
            <p>{theme.text}</p>
            <footer>{theme.role}</footer>
            <small>{String(index + 1).padStart(2, "0")}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
