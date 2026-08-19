export type VisualAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  position?: string;
};

export const visualAssets = {
  hero: {
    src: "/images/illustrative/hero-aula.png",
    width: 1122,
    height: 1402,
    alt: "Turma diversa dançando forró em uma sala de aula",
    caption: "Dança, proximidade e movimento",
    position: "50% 50%",
  },
  arrival: {
    src: "/images/illustrative/chegada-sem-par.png",
    width: 1448,
    height: 1086,
    alt: "Pessoa chegando sozinha e observando uma aula de forró",
    caption: "Você pode chegar sem saber e sem levar par",
    position: "54% 50%",
  },
  exchange: {
    src: "/images/illustrative/troca-de-pares.png",
    width: 1536,
    height: 1024,
    alt: "Alunos trocando de pares durante uma aula de forró",
    caption: "Troca de pares e movimento coletivo",
  },
  guidance: {
    src: "/images/illustrative/orientacao-professor.png",
    width: 1536,
    height: 1024,
    alt: "Professora orientando a postura de uma dupla",
    caption: "Orientação próxima durante a prática",
  },
  footwork: {
    src: "/images/illustrative/passos-pes.png",
    width: 1536,
    height: 1024,
    alt: "Pés de várias pessoas praticando bases de forró",
    caption: "Bases que ajudam o corpo a encontrar o ritmo",
  },
  turn: {
    src: "/images/illustrative/giro-simples.png",
    width: 1122,
    height: 1402,
    alt: "Dupla praticando um giro simples de forró",
    caption: "Giro simples em movimento",
  },
  monitors: {
    src: "/images/illustrative/monitores.png",
    width: 1536,
    height: 1024,
    alt: "Três monitores conversando depois de uma aula",
    caption: "Quem começou como aluno também ajuda a turma a avançar",
  },
  community: {
    src: "/images/illustrative/convivencia.png",
    width: 1536,
    height: 1024,
    alt: "Grupo de alunos conversando e rindo depois da aula",
    caption: "Convivência que continua depois da dança",
  },
} satisfies Record<string, VisualAsset>;
