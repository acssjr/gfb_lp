import Image from "next/image";
import styles from "@/components/landing/Landing.module.css";

export function ProofSection() {
  return (
    <section className={styles.proofSection} aria-label="Experiência do Grupo Forró do Bom" data-proof>
      <div className={styles.proofHeading}>
        <p className={styles.proofLabel} data-proof-label>O GFB em dois números</p>
        <span className={styles.proofRule} aria-hidden="true" data-proof-rule />
      </div>
      <div className={styles.proofGrid}>
        <p data-stat>
          <strong aria-label="11 anos">
            <span aria-hidden="true" data-proof-value>11 anos</span>
          </strong>
          <span data-stat-label>fazendo gente dançar.</span>
        </p>
        <p data-stat>
          <strong aria-label="mais de 500 alunos">
            <span aria-hidden="true" data-proof-value>+ de 500</span>
          </strong>
          <span data-stat-label>alunos formados.</span>
        </p>
      </div>
      <span className={styles.proofOrbit} aria-hidden="true" data-proof-orbit>
        <Image src="/brand/gfb-monogram.svg" alt="" width={1331} height={1080} />
      </span>
    </section>
  );
}
