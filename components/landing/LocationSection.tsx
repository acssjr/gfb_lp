"use client";

import Image from "next/image";
import { mapLinks, siteConfig } from "@/config/site";
import { visualAssets } from "@/config/visualAssets";
import { trackEvent } from "@/lib/analytics";
import styles from "@/components/landing/Landing.module.css";

const locationPreview = [
  { asset: visualAssets.exchange, label: "Espaço para a turma se movimentar" },
  { asset: visualAssets.guidance, label: "Orientação próxima durante a aula" },
  { asset: visualAssets.community, label: "Encontros que continuam depois da dança" },
] as const;

export function LocationSection() {
  const { address } = siteConfig;

  return (
    <section id="localizacao" className={styles.locationSection} aria-labelledby="location-title">
      <div className={styles.locationCopy} data-reveal>
        <p className={styles.kicker}>ONDE ACONTECE</p>
        <h2 id="location-title">No coração da Cidade Nova.</h2>
        <address>
          <strong>{address.venue}</strong>
          <span>{address.street}, {address.district}</span>
          <span>{address.city}, {address.region}</span>
          <span>CEP {address.postalCode}</span>
          {address.reference ? <small>{address.reference}</small> : null}
        </address>
        <a
          className={styles.secondaryButton}
          href={mapLinks.route}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("map_clicked", { cta_location: "location" })}
        >
          Ver rota
        </a>
      </div>
      <div className={styles.locationVisuals}>
        <div className={styles.locationGallery} data-location-gallery aria-label="Ambiente das aulas">
          {locationPreview.map(({ asset, label }, index) => (
            <figure key={label} data-location-photo>
              <div>
                <Image
                  src={asset.src}
                  alt={asset.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 767px) 78vw, 24vw"
                  style={{
                    objectPosition:
                      "position" in asset && typeof asset.position === "string"
                        ? asset.position
                        : undefined,
                  }}
                />
              </div>
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {label}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className={styles.mapFrame} data-reveal>
          <iframe
            title="Mapa da Escola Criativa em Feira de Santana"
            src={mapLinks.embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
