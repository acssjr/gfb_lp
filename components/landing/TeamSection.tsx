import { IllustrativeImage } from "@/components/ui/IllustrativeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { teamStories } from "@/content/siteContent";
import { visualAssets } from "@/config/visualAssets";
import styles from "@/components/landing/Landing.module.css";

export function TeamSection() {
  return (
    <section className={styles.teamSection} aria-labelledby="team-title">
      <SectionHeading
        kicker="PROFESSORES"
        title="Quem acompanha você nas aulas."
        text="Hoje, Tailan, Sthefanie, Luinne e Karine formam a equipe de professores do GFB."
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
              {story.text ? <p>{story.text}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
