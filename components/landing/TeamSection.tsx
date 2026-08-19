import { IllustrativeImage } from "@/components/ui/IllustrativeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { teamStories } from "@/content/siteContent";
import { visualAssets } from "@/config/visualAssets";
import styles from "@/components/landing/Landing.module.css";

export function TeamSection() {
  return (
    <section className={styles.teamSection} aria-labelledby="team-title">
      <SectionHeading
        kicker="MONITORES"
        title="Eles também começaram do zero."
        text="Quem hoje orienta de perto também conhece a coragem que existe no primeiro passo."
        id="team-title"
      />
      <div className={styles.teamFeature}>
        <IllustrativeImage
          asset={visualAssets.monitors}
          ratio="landscape"
          sizes="(max-width: 767px) 100vw, 56vw"
          depth="medium"
        />
        <div className={styles.teamGrid}>
          {teamStories.map((story, index) => (
            <article key={story.title} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{story.title}</h3>
              <strong className={styles.teamMeta}>{story.meta}</strong>
              <p>{story.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
