export const whatsappMessages = {
  beginner:
    "Olá! Quero começar no Grupo Forró do Bom e gostaria de saber sobre a próxima turma iniciante.",
  thursday: "Olá! Tenho interesse na próxima turma de quinta-feira, às 19h30.",
  saturday: "Olá! Tenho interesse na próxima turma de sábado, às 14h.",
  plan: (planName: string) =>
    `Olá! Tenho interesse no plano ${planName} do Grupo Forró do Bom.`,
  leveling: (level: string) =>
    `Olá! Já danço e quero agendar um nivelamento gratuito para o nível ${level}.`,
} as const;

export const navigationItems = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#o-que-aprende", label: "O que você aprende" },
  { href: "#planos", label: "Planos" },
  { href: "#nivelamento", label: "Nivelamento" },
] as const;

export const recognitionItems = [
  "Eu acho que não levo jeito",
  "Tenho vergonha de errar",
  "Eu travo quando começa o forró",
] as const;

export const atmosphereFrames = [
  {
    label: "Dança em movimento",
    ratio: "portrait",
    asset: "hero",
  },
  {
    label: "Trocas e risadas",
    ratio: "landscape",
    asset: "exchange",
  },
  {
    label: "Orientação próxima",
    ratio: "square",
    asset: "guidance",
  },
  {
    label: "A turma por dentro",
    ratio: "landscape",
    asset: "community",
  },
] as const;

export const beginnerSteps = [
  {
    number: "01",
    title: "Escolha o dia",
    text: "Quinta, às 19h30, ou sábado, às 14h. Você entra no início de uma nova turma.",
  },
  {
    number: "02",
    title: "Participe da primeira aula por R$ 39.",
    text: "Conheça o método, as pessoas e o ritmo da aula antes de decidir.",
  },
  {
    number: "03",
    title: "Se quiser continuar, use o valor como crédito.",
    text: "Os R$ 39 são abatidos da sua matrícula no plano escolhido.",
  },
] as const;

export const learningItems = [
  {
    label: "RITMO",
    fear: "Medo de ficar parado quando a música começa",
    title: "Você aprende a encontrar a marcação.",
    text: "Com o dois pra lá e dois pra cá, seu corpo começa a reconhecer o tempo da música e você sabe como entrar na dança.",
  },
  {
    label: "CONTINUIDADE",
    fear: "Receio de travar entre um movimento e outro",
    title: "Você começa a conectar as bases.",
    text: "A base frontal e os deslocamentos deixam de ser movimentos soltos e começam a formar uma dança com começo, meio e continuidade.",
  },
  {
    label: "RECURSOS",
    fear: "Medo de errar e perder a música",
    title: "Você ganha recursos para seguir dançando.",
    text: "Giro simples e chuveirinho ampliam suas possibilidades. Se algo sair diferente, você já tem uma base para se reorganizar e continuar.",
  },
] as const;

export const differences = [
  {
    title: "11 anos de experiência",
    text: "Tempo de prática acompanhando pessoas que chegaram com histórias e ritmos diferentes.",
  },
  {
    title: "Progressão com conteúdo próprio",
    text: "Cada encontro traz algo completo e, ao mesmo tempo, prepara o corpo para o próximo passo.",
  },
  {
    title: "A turma orienta o ritmo",
    text: "A evolução acompanha a desenvoltura real dos participantes, sem correr por uma ementa.",
  },
  {
    title: "Professores e monitores por perto",
    text: "Há gente observando, demonstrando e ajudando quando uma dúvida aparece.",
  },
  {
    title: "Você pode chegar sem par",
    text: "As trocas fazem parte da dinâmica e ajudam todo mundo a desenvolver a dança.",
  },
] as const;

export const teamStories = [
  {
    title: "Júlia",
    meta: "3 anos de GFB · monitora",
    text: "Cheguei achando que seria a única pessoa sem experiência. Hoje, ajudo quem entra com o mesmo frio na barriga.",
  },
  {
    title: "Caio",
    meta: "4 anos de GFB · monitor",
    text: "Eu mal conseguia ouvir a marcação da música. A prática me deu segurança e vontade de ajudar outras pessoas.",
  },
  {
    title: "Renata",
    meta: "2 anos de GFB · monitora",
    text: "Comecei sozinha e fui acolhida pela turma. Nas aulas, quero que cada pessoa sinta essa mesma tranquilidade.",
  },
] as const;

export const plans = [
  {
    name: "Para conhecer o GFB",
    role: "Porta de entrada",
    price: "R$ 39",
    cadence: "primeira aula",
    benefit: "Descubra que você também consegue dançar.",
    items: [
      "Primeira aula de uma nova turma",
      "Experiência com o método e o ambiente do GFB",
      "Valor integralmente convertido em crédito na matrícula",
      "Com +R$ 40, você garante o mês de aulas para continuar se desenvolvendo na dança",
    ],
    cta: "Quero conhecer",
    badge: "COMECE POR AQUI",
    recommended: false,
    acceleration: false,
    note: "",
  },
  {
    name: "Essencial GFB",
    role: "Para criar constância",
    price: "R$ 79",
    cadence: "por mês",
    benefit: "O melhor equilíbrio entre acompanhamento, prática e investimento.",
    items: [
      "Uma aula por semana com progressão contínua",
      "Acompanhamento da evolução no ritmo da turma",
      "Conteúdos completos em cada encontro",
      "Professores e monitores acompanhando a turma",
      "Trocas de pares para desenvolver a dança",
    ],
    cta: "Escolher Essencial",
    badge: "O MAIS ESCOLHIDO",
    recommended: true,
    acceleration: false,
    note: "A rotina certa para evoluir sem precisar fazer duas aulas por semana.",
  },
  {
    name: "GFB Plus",
    role: "Para acelerar",
    price: "R$ 159",
    cadence: "por mês",
    benefit: "Para quem quer acelerar a evolução com mais prática e atenção individual.",
    items: [
      "Tudo o que está no Essencial",
      "Participação nas turmas de quinta e sábado",
      "Duas oportunidades semanais para praticar, corrigir e fixar",
      "Uma aula particular inicial para agendar",
      "Observação individual da movimentação",
      "Correções pontuais de postura, pisada, ritmo e estética",
    ],
    note: "A aula particular é um benefício inicial, não uma aula mensal.",
    cta: "Escolher Plus",
    badge: "MAIS PRÁTICA",
    recommended: false,
    acceleration: true,
  },
] as const;

export const testimonialThemes = [
  {
    title: "Mariana",
    role: "aluna iniciante",
    text: "Eu cheguei sozinha e achei que ia ficar perdida. Na primeira aula percebi que todo mundo estava ali para aprender. Quando dancei uma música inteira, saí sorrindo.",
  },
  {
    title: "Lucas",
    role: "aluno GFB",
    text: "Eu tinha vergonha de errar e ficava duro quando começava o forró. Com as aulas, fui entendendo o ritmo e hoje consigo aproveitar a dança sem pensar em cada passo.",
  },
  {
    title: "Camila",
    role: "aluna GFB",
    text: "O que mais me surpreendeu foi me sentir parte da turma tão rápido. Além de aprender a dançar, encontrei pessoas com quem gosto de estar.",
  },
] as const;

export const levelingSteps = [
  "Você conta em qual nível pretende ingressar: básico, intermediário ou avançado.",
  "O encontro gratuito é agendado pelo WhatsApp. Um professor vai avaliar uma dança sua e propor exercícios compatíveis com o nível escolhido.",
  "Observamos ritmo, musicalidade, bases, passos, condução, resposta à condução e repertório. Finalizações e enfeites entram conforme o nível.",
  "Ao final, o professor indica a turma mais adequada. A entrada acontece no início da próxima turma desse nível.",
] as const;

export const faqItems = [
  {
    question: "E se eu achar que não tenho ritmo?",
    answer:
      "Ritmo também se aprende. A turma começa pelas bases, repete o necessário e avança conforme a desenvoltura das pessoas, não conforme uma pressa externa.",
  },
  {
    question: "Vou precisar dançar com pessoas que não conheço?",
    answer:
      "As trocas de pares fazem parte da dinâmica porque ajudam a desenvolver a dança. Você pode chegar sem par e participar no seu ritmo.",
  },
  {
    question: "Sou tímido. Vou precisar me expor na frente da turma?",
    answer:
      "A proposta é aprender em grupo, com demonstração e prática orientada. Você não precisa chegar pronto nem provar que sabe dançar.",
  },
  {
    question: "Que roupa e calçado eu uso na primeira aula?",
    answer:
      "Escolha roupas confortáveis, que deixem o corpo se mover, e um calçado firme no pé. Se estiver em dúvida sobre o que você já tem, confirme com a equipe pelo WhatsApp.",
  },
  {
    question: "E se eu faltar a uma aula?",
    answer:
      "Não há reposição de aula, mas todos os alunos têm acesso aos vídeos dos passos trabalhados. Assim, você entende o que foi visto e pode praticar durante a semana, sozinho ou com um par.",
  },
  {
    question: "Posso fazer a primeira aula e decidir o plano depois?",
    answer:
      "Sim. A primeira aula custa R$ 39 para você conhecer o método e o ambiente. Se decidir continuar, esse valor vira crédito na matrícula.",
  },
  {
    question: "Eu já sei alguns passos. Preciso começar do zero?",
    answer:
      "Não necessariamente. O nivelamento gratuito ajuda a entender se a sua dança se encaixa no básico, intermediário ou avançado dentro da metodologia GFB.",
  },
  {
    question: "Quanto tempo leva para eu conseguir dançar uma música?",
    answer:
      "Não existe um prazo igual para todo mundo. No primeiro mês você começa pelas bases que ajudam o corpo a entender o ritmo e montar a dança com mais segurança.",
  },
] as const;
