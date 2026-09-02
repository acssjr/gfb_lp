import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, statSync } from "node:fs";
import { LandingPage } from "@/components/landing/LandingPage";

describe("LandingPage", () => {
  it("renders the approved message, trust proof and three editable plans", () => {
    render(<LandingPage />);

    expect(
      screen.getByRole("heading", { name: "Você também pode dançar forró." }),
    ).toBeInTheDocument();
    expect(screen.getByText("fazendo gente dançar.")).toBeInTheDocument();
    expect(screen.getByText("pessoas já passaram pelo GFB.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Para conhecer o GFB" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Essencial GFB" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "GFB Plus" })).toBeInTheDocument();
  });

  it("renders complete editorial content without placeholder disclosures", () => {
    const { container } = render(<LandingPage />);

    expect(container.textContent).not.toMatch(/placeholder/i);
    expect(container.textContent).not.toMatch(/imagem ilustrativa|relato real em preparação/i);
    expect(screen.getAllByRole("img").length).toBeGreaterThanOrEqual(8);
  });

  it("exposes the kinetic hooks used by the recognition choreography", () => {
    const { container } = render(<LandingPage />);

    expect(container.querySelector("[data-kinetic-section]")).toBeInTheDocument();
    expect(container.querySelectorAll("[data-kinetic-row]")).toHaveLength(3);
    expect(container.querySelector("[data-kinetic-image]")).toBeInTheDocument();
  });

  it("uses natural beginner language and a visible secondary route for dancers", () => {
    const { container } = render(<LandingPage />);

    expect(screen.getByText("Eu acho que não levo jeito", { selector: "strong" })).toBeInTheDocument();
    expect(screen.getByText("Tenho vergonha de errar", { selector: "strong" })).toBeInTheDocument();
    expect(
      screen.getByText("Eu travo quando começa o forró", { selector: "strong" }),
    ).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/receio de não acompanhar/i);
    expect(container.querySelector("[data-secondary-route]")).toHaveTextContent("Já danço");
    expect(
      screen.getByText("Se você já se pegou pensando alguma dessas coisas, está no lugar certo."),
    ).toBeInTheDocument();
  });

  it("presents one-month outcomes as an accessible carousel", async () => {
    const user = userEvent.setup();
    const { container } = render(<LandingPage />);

    expect(
      screen.getByRole("heading", {
        name: "Em um mês, você já começa a combinar ritmo, bases e movimentos.",
      }),
    ).toBeInTheDocument();
    expect(container.querySelector("[data-learning-carousel]")).toBeInTheDocument();
    expect(screen.getByText(/você reconhece a marcação e entra na dança/i)).toBeInTheDocument();
    expect(container.querySelector("[data-learning-fear]")).not.toBeInTheDocument();
    expect(container.textContent).not.toMatch(/perder a música|receio que começa/i);
    expect(container.textContent).not.toMatch(/não é sobre/i);

    await user.click(screen.getByRole("button", { name: "Próximo resultado" }));
    expect(screen.getByRole("button", { name: "Mostrar resultado 2" })).toHaveAttribute(
      "aria-current",
      "true",
    );
  });

  it("turns the atmosphere gallery into an accessible animated carousel", async () => {
    const user = userEvent.setup();
    const { container } = render(<LandingPage />);

    const carousel = container.querySelector("[data-atmosphere-carousel]");
    expect(carousel).toBeInTheDocument();
    expect(carousel?.querySelectorAll("[data-atmosphere-slide]")).toHaveLength(6);

    await user.click(screen.getByRole("button", { name: "Próximo registro" }));
    expect(screen.getByRole("button", { name: "Mostrar registro 2" })).toHaveAttribute(
      "aria-current",
      "true",
    );
  });

  it("uses named real GFB media without eagerly loading inactive videos", async () => {
    const user = userEvent.setup();
    const { container } = render(<LandingPage />);

    const teamPhoto = screen.getByRole("img", {
      name: /equipe de professores do grupo forró do bom/i,
    });
    expect(teamPhoto.getAttribute("src")).toContain("equipe-professores-gfb.webp");

    const videos = Array.from(
      container.querySelectorAll<HTMLVideoElement>("[data-atmosphere-video]"),
    );
    expect(videos).toHaveLength(3);
    videos.forEach((video) => {
      expect(video).toHaveAttribute("preload", "none");
      expect(video).toHaveAttribute("playsinline");
      expect(video.muted).toBe(true);
      expect(video.querySelector("source")).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Próximo registro" }));
    const activeVideo = container.querySelector<HTMLVideoElement>(
      '[data-atmosphere-slide][data-active="true"] [data-atmosphere-video]',
    );
    expect(activeVideo?.querySelector("source")).toHaveAttribute(
      "src",
      "/media/gfb/comunidade-gfb-encontro-silencioso.mp4",
    );

    const mediaFiles = [
      "public/images/gfb/equipe-professores-gfb.webp",
      "public/images/gfb/comunidade-gfb-confraternizacao.webp",
      "public/media/gfb/comunidade-gfb-encontro-silencioso.mp4",
      "public/media/gfb/comunidade-gfb-encontro-poster.webp",
      "public/media/gfb/turma-iniciante-em-movimento-silencioso.mp4",
      "public/media/gfb/turma-iniciante-em-movimento-poster.webp",
      "public/media/gfb/aula-em-movimento-reel-silencioso.mp4",
      "public/media/gfb/aula-em-movimento-reel-poster.webp",
      "public/images/gfb/historia-gfb-uefs-2017.webp",
      "public/images/gfb/comunidade-gfb-evento-2024.webp",
      "public/images/gfb/turma-gfb-encontro-01.webp",
      "public/images/gfb/turma-gfb-registro-2022.webp",
    ];

    mediaFiles.forEach((path) => expect(existsSync(path)).toBe(true));
    expect(statSync(mediaFiles[2]).size).toBeLessThan(2_000_000);
    expect(statSync(mediaFiles[4]).size).toBeLessThan(5_000_000);
    expect(statSync(mediaFiles[6]).size).toBeLessThan(4_000_000);
  });

  it("presents pricing in a natural entry, essential, and acceleration order", () => {
    const { container } = render(<LandingPage />);

    expect(screen.getByText("O MAIS ESCOLHIDO")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "GFB Plus" })).toBeInTheDocument();
    expect(screen.getByText(/para quem quer acelerar a evolução/i)).toBeInTheDocument();
    expect(container.querySelector("[data-pricing-stage]")).toBeInTheDocument();
    const recommended = container.querySelector("[data-recommended-plan]");
    expect(recommended).toHaveTextContent("Essencial GFB");
    expect(recommended).toHaveTextContent("O MAIS ESCOLHIDO");
    expect(recommended).toHaveTextContent("Acompanhamento da evolução no ritmo da turma");
    expect(recommended).not.toHaveAttribute("data-mobile-priority");

    const cards = [...container.querySelectorAll("[data-price-card]")];
    expect(cards).toHaveLength(3);
    expect(cards[0]).toHaveAttribute("data-entry-plan", "true");
    expect(cards[0]).toHaveTextContent("Para conhecer o GFB");
    expect(cards[0]).toHaveTextContent("Experimente o método e conheça a turma");
    expect(cards[0]).toHaveTextContent(
      "Se continuar, por mais R$ 40 você garante o primeiro mês no Essencial",
    );
    expect(cards[1]).toHaveTextContent("Essencial GFB");
    expect(cards[2]).toHaveTextContent("GFB Plus");
    expect(container.querySelector("[data-mobile-priority]")).not.toBeInTheDocument();
    expect(readFileSync("components/landing/Landing.module.css", "utf8")).not.toMatch(
      /\[data-mobile-priority="true"\][\s\S]*order:\s*-1/,
    );
    expect(recommended).not.toHaveTextContent("Escolha entre quinta");
    expect(screen.getByText(/a aula inicial abre a porta/i)).toBeInTheDocument();
    expect(
      screen.getByText(/você escolhe o plano e conversa com a equipe pelo WhatsApp/i),
    ).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/Se continuar, os R\$ 39 viram crédito/i);
  });

  it("presents the current four-person teaching team", () => {
    render(<LandingPage />);

    expect(screen.getByText("PROFESSORES")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tailan" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Sthefanie" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Luinne" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Karine" })).toBeInTheDocument();
    expect(screen.getByText(/11 anos de GFB · professor e fundador/i)).toBeInTheDocument();
    expect(screen.getAllByText(/8 anos de GFB/i)).toHaveLength(2);
    expect(screen.getByText(/3 anos de GFB/i)).toBeInTheDocument();
  });

  it("uses conversational simulated testimonials with a concrete discovery moment", () => {
    render(<LandingPage />);

    expect(screen.getByText(/conheci o GFB por uma amiga/i)).toBeInTheDocument();
    expect(screen.getByText(/acompanhava o trabalho do Tailan pelo Instagram/i)).toBeInTheDocument();
    expect(screen.getByText(/cheguei ao GFB por indicação de uma colega/i)).toBeInTheDocument();
  });

  it("uses a stronger waitlist invitation and practical pre-class questions", () => {
    const { container } = render(<LandingPage />);

    expect(
      screen.getByRole("heading", { name: "O próximo começo pode ser o seu." }),
    ).toBeInTheDocument();
    const scheduleSection = container.querySelector("#proxima-turma");
    expect(scheduleSection).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: "Qual horário funciona melhor para você?" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Quinta-feira às 19h30/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Sábado às 14h/i })).toBeInTheDocument();
    expect(screen.getByText("Estamos ansiosos para ter você conosco.")).toBeInTheDocument();
    expect(screen.getByText("E se eu achar que não tenho ritmo?")).toBeInTheDocument();
    expect(
      screen.getByText("Que roupa e calçado eu uso na primeira aula?"),
    ).toBeInTheDocument();
    expect(screen.getByText("E se eu faltar a uma aula?")).toBeInTheDocument();
    expect(screen.getByText(/acesso aos vídeos dos passos trabalhados/i)).toBeInTheDocument();
    expect(screen.getByText("PERGUNTAS FREQUENTES")).toBeInTheDocument();
  });

  it("uses one responsive depth ScrollTrigger instead of recreating one per image", () => {
    const animationSource = readFileSync("components/landing/AnimatedLanding.tsx", "utf8");

    expect(animationSource).toContain("const depthElements");
    expect(animationSource).toMatch(/gsap\.fromTo\(\s*depthElements,/);
    expect(animationSource).not.toMatch(
      /toArray<HTMLElement>\("\[data-depth\]"\)\.forEach/,
    );
  });

  it("keeps trust numbers static while exposing presentation-only choreography hooks", () => {
    const { container } = render(<LandingPage />);

    expect(container.querySelector("[data-proof-rule]")).toBeInTheDocument();
    expect(container.querySelectorAll("[data-proof-value]")).toHaveLength(2);
    expect(container.querySelector("[data-count-target]")).not.toBeInTheDocument();
    expect(screen.getByText("11 anos")).toBeInTheDocument();
    expect(screen.getByText("+ de 3.000")).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/\+ de 500/);
  });

  it("exposes a sequential narrative for the three beginner steps", () => {
    const { container } = render(<LandingPage />);

    expect(container.querySelector("[data-how-steps]")).toBeInTheDocument();
    expect(container.querySelectorAll("[data-how-step]")).toHaveLength(3);
    expect(container.querySelectorAll("[data-how-rule]")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "Escolha o dia" })).toBeInTheDocument();
  });

  it("combines the map with a three-image preview of the class venue", () => {
    const { container } = render(<LandingPage />);

    const gallery = container.querySelector("[data-location-gallery]");
    expect(gallery).toBeInTheDocument();
    expect(gallery?.querySelectorAll("img")).toHaveLength(3);
  });

  it("opens and closes FAQ items with aria-expanded", async () => {
    const user = userEvent.setup();
    render(<LandingPage />);

    const trigger = screen.getByRole("button", {
      name: "Vou precisar dançar com pessoas que não conheço?",
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger.querySelector("[data-faq-icon]")).toBeInTheDocument();
    expect(
      screen.getByText(/as trocas de pares fazem parte da dinâmica porque ajudam/i),
    ).toBeVisible();
  });

  it("keeps mobile navigation mounted and exposes its visual state", async () => {
    const user = userEvent.setup();
    const { container } = render(<LandingPage />);
    const navigation = container.querySelector("#site-navigation");

    expect(navigation).toHaveAttribute("data-open", "false");
    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(navigation).toHaveAttribute("data-open", "true");
  });

  it("opens the leveling dialog and exposes the free WhatsApp route", async () => {
    const user = userEvent.setup();
    render(<LandingPage />);

    await user.click(
      screen.getAllByRole("button", { name: "Como funciona o nivelamento?" })[0],
    );

    expect(screen.getByRole("dialog", { name: /como funciona o nivelamento/i })).toBeVisible();
    expect(screen.getByText("Um encontro cuidadoso, não uma prova.")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Nível pretendido" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").filter((item) => item.closest("dialog"))).toHaveLength(4);
    expect(document.body).toHaveStyle({ overflow: "hidden" });
  });

  it("uses a branded accessible level selector and describes the teacher evaluation", async () => {
    const user = userEvent.setup();
    render(<LandingPage />);

    await user.click(
      screen.getAllByRole("button", { name: "Como funciona o nivelamento?" })[0],
    );

    expect(
      screen.getByText(/um professor vai avaliar uma dança sua/i),
    ).toBeInTheDocument();

  const trigger = screen.getByRole("combobox", { name: "Nível pretendido" });
  expect(trigger.tagName).toBe("BUTTON");
  await user.click(trigger);

  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);
    expect(document.querySelector("[data-level-select-popup]")).toBeInTheDocument();
  });

  it("uses the new brand ending and Instagram route", () => {
    const { container } = render(<LandingPage />);

    expect(
      screen.getByRole("heading", { name: "Sua vida pede um Forró do Bom." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /instagram do grupo forró do bom/i })).toHaveAttribute(
      "href",
      "https://www.instagram.com/dobomforro/",
    );
    expect(screen.getByRole("link", { name: /instagram do grupo forró do bom/i })).not.toHaveTextContent(
      "@dobomforro",
    );
    expect(container.querySelector(`header img`)?.getAttribute("src")).toContain("gfb-logo.svg");
    expect(container.querySelector(`footer img`)?.getAttribute("src")).toContain(
      "gfb-logo-stacked.svg",
    );
  });

  it("describes the history on the hero seal", () => {
    const { container } = render(<LandingPage />);

    expect(container.querySelector("[data-hero-stamp]")).toHaveTextContent(
      "11 anos de história",
    );
  });

  it("presents the GFB origin story and uses a real class image in the hero", () => {
    const { container } = render(<LandingPage />);

    expect(
      screen.getByRole("heading", {
        name: /de nove pessoas na uefs a uma escola que faz feira dançar/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/nasceu em junho de 2015, na uefs/i)).toBeInTheDocument();
    expect(screen.getByText(/mais de 3 mil pessoas já passaram pelo gfb/i)).toBeInTheDocument();
    expect(screen.getByText("HISTÓRIA DO GFB")).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/atualmente contamos com aproximadamente 200/i);
    expect(container.textContent).not.toMatch(/9 pessoas no começo/i);

    const heroImage = container.querySelector<HTMLImageElement>("#inicio img");
    expect(heroImage?.getAttribute("src")).toContain("turma-gfb-registro-2022.webp");
    expect(existsSync("public/images/gfb/turma-gfb-registro-2022.webp")).toBe(true);
    expect(screen.getByText("Dá para se imaginar aqui no meio.")).toBeInTheDocument();
    expect(
      container.querySelector("#quem-e-o-gfb img")?.getAttribute("src"),
    ).toContain("historia-gfb-uefs-2017.webp");
    const historyImage = container.querySelector("#quem-e-o-gfb img");
    const legacyText = screen.getByText(/mais de 3 mil pessoas já passaram pelo gfb/i);
    expect(
      historyImage &&
        Boolean(historyImage.compareDocumentPosition(legacyText) & Node.DOCUMENT_POSITION_FOLLOWING),
    ).toBe(true);
  });

  it("adapts the atmosphere stage to portrait Reels and loads only the active video", async () => {
    const user = userEvent.setup();
    const { container } = render(<LandingPage />);
    const carousel = container.querySelector("[data-atmosphere-carousel]");

    expect(carousel?.querySelectorAll("[data-atmosphere-slide]")).toHaveLength(6);
    expect(
      carousel?.querySelectorAll(
        '[data-atmosphere-slide][data-media-orientation="portrait"]',
      ),
    ).toHaveLength(3);
    expect(carousel?.querySelectorAll("[data-atmosphere-video]")).toHaveLength(3);

    await user.click(screen.getByRole("button", { name: "Mostrar registro 6" }));
    expect(carousel).toHaveAttribute("data-active-format", "portrait");
    expect(
      carousel?.querySelector('[data-active="true"] source'),
    ).toHaveAttribute("src", "/media/gfb/aula-em-movimento-reel-silencioso.mp4");
    expect(carousel?.querySelectorAll("source")).toHaveLength(1);
  });

  it("keeps the horizontal header logo transparent", () => {
    const logo = readFileSync("public/brand/gfb-logo.svg", "utf8");

    expect(logo).toContain("path:first-of-type{display:none}");
  });

  it("builds the leveling selector as one adaptive GSAP word morph", () => {
    const { container } = render(<LandingPage />);
    const morph = container.querySelector("[data-level-morph]");

    expect(morph).toBeInTheDocument();
    expect(morph?.querySelectorAll("[data-level-word]")).toHaveLength(4);
    expect(morph?.querySelectorAll("[data-level-char]").length).toBeGreaterThan(20);
    expect(container.querySelector("[data-level-morph-frame]")).toBeInTheDocument();
  });

  it("adds complete institutional and payment information to the footer", () => {
    render(<LandingPage />);

    expect(screen.getByRole("link", { name: "Política de privacidade" })).toHaveAttribute(
      "href",
      "/politica-de-privacidade",
    );
    expect(screen.getByRole("link", { name: "Termos de uso" })).toHaveAttribute(
      "href",
      "/termos-de-uso",
    );
    expect(screen.getByText(/não há pagamento on-line nesta página/i)).toBeInTheDocument();
    expect(screen.getByText(/formas de pagamento são confirmadas/i)).toBeInTheDocument();
  });
});
