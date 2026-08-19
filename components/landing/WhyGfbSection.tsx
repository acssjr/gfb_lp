import { SectionHeading } from "@/components/ui/SectionHeading";
import { differences } from "@/content/siteContent";
import styles from "@/components/landing/Landing.module.css";

export function WhyGfbSection() {
  return (
    <section className={styles.whySection} aria-labelledby="why-title">
      <SectionHeading
        kicker="POR QUE O GFB"
        title="Uma escola que faz sua dança se destacar."
        id="why-title"
        inverse
      />
      <div className={styles.differenceList}>
        {differences.map((item, index) => (
          <article key={item.title} data-reveal>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
