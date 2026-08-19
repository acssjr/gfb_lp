import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { LandingPage } from "@/components/landing/LandingPage";

describe("LandingPage", () => {
  it("renders the approved message, trust proof and three editable plans", () => {
    render(<LandingPage />);

    expect(
      screen.getByRole("heading", { name: "Você também pode dançar forró." }),
    ).toBeInTheDocument();
    expect(screen.getByText("fazendo gente dançar.")).toBeInTheDocument();
    expect(screen.getByText("alunos formados.")).toBeInTheDocument();
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
    expect(screen.getByText(/medo de ficar parado quando a música começa/i)).toBeInTheDocument();
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
    expect(carousel?.querySelectorAll("[data-atmosphere-slide]")).toHaveLength(4);

    await user.click(screen.getByRole("button", { name: "Próxima foto" }));
    expect(screen.getByRole("button", { name: "Mostrar foto 2" })).toHaveAttribute(
      "aria-current",
      "true",
    );
  });

  it("recommends Essencial and positions Plus as the acceleration option", () => {
    const { container } = render(<LandingPage />);

    expect(screen.getByText("O MAIS ESCOLHIDO")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "GFB Plus" })).toBeInTheDocument();
    expect(screen.getByText(/para quem quer acelerar a evolução/i)).toBeInTheDocument();
    expect(container.querySelector("[data-pricing-stage]")).toBeInTheDocument();
    const recommended = container.querySelector("[data-recommended-plan]");
    expect(recommended).toHaveTextContent("Essencial GFB");
    expect(recommended).toHaveTextContent("O MAIS ESCOLHIDO");
    expect(recommended).toHaveTextContent("Acompanhamento da evolução no ritmo da turma");
    expect(recommended).not.toHaveTextContent("Escolha entre quinta");
    expect(screen.getByText(/a aula inicial abre a porta/i)).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/Se continuar, os R\$ 39 viram crédito/i);
  });

  it("uses a stronger waitlist invitation and practical pre-class questions", () => {
    render(<LandingPage />);

    expect(
      screen.getByRole("heading", { name: "O próximo começo pode ser o seu." }),
    ).toBeInTheDocument();
    expect(screen.getByText("Estamos ansiosos para ter você conosco.")).toBeInTheDocument();
    expect(screen.getByText("E se eu achar que não tenho ritmo?")).toBeInTheDocument();
    expect(
      screen.getByText("Que roupa e calçado eu uso na primeira aula?"),
    ).toBeInTheDocument();
    expect(screen.getByText("E se eu faltar a uma aula?")).toBeInTheDocument();
    expect(screen.getByText(/acesso aos vídeos dos passos trabalhados/i)).toBeInTheDocument();
    expect(screen.getByText("PERGUNTAS FREQUENTES")).toBeInTheDocument();
  });

  it("keeps trust numbers static while exposing presentation-only choreography hooks", () => {
    const { container } = render(<LandingPage />);

    expect(container.querySelector("[data-proof-rule]")).toBeInTheDocument();
    expect(container.querySelectorAll("[data-proof-value]")).toHaveLength(2);
    expect(container.querySelector("[data-count-target]")).not.toBeInTheDocument();
    expect(screen.getByText("11 anos")).toBeInTheDocument();
    expect(screen.getByText("+ de 500")).toBeInTheDocument();
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
