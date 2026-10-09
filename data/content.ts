// a ordem aqui é a ordem do menu
export const sections = {
  servicos: { id: "servicos", label: "Serviços" },
  projetos: { id: "projetos", label: "Projetos" },
  contato: { id: "contato", label: "Contato" },
} as const;

export const navItems = Object.values(sections);

export const site = {
  /** aparece no menu (só o primeiro nome no celular), no hero e no título da aba */
  name: "João Henrique",
  /** foto em public/ */
  photo: "/joao.webp",
  tagline: "sites feitos para vender.",
  /** assinatura no rodapé */
  signature: "Código pensado, não gerado.",
  year: 2026,
};

export const marquee = [
  "Código pensado, não gerado",
  "Design sob medida",
  "Feito para celular",
  "Você aprova antes",
  "Atendimento direto comigo",
  "Pagamento em duas partes",
];

export type Project = {
  title: string;
  stack: string;
  description: string;
  href: string;
};

export const projects: Project[] = [
  {
    title: "Projeto 01",
    stack: "STACK A DEFINIR",
    description: "Descrição do projeto em breve.",
    href: "#",
  },
  {
    title: "Projeto 02",
    stack: "STACK A DEFINIR",
    description: "Descrição do projeto em breve.",
    href: "#",
  },
  {
    title: "Projeto 03",
    stack: "STACK A DEFINIR",
    description: "Descrição do projeto em breve.",
    href: "#",
  },
  {
    title: "Projeto 04",
    stack: "STACK A DEFINIR",
    description: "Descrição do projeto em breve.",
    href: "#",
  },
];

export type Service = { title: string; text: string; ideal: string };

/** Seção "O que eu faço". Os títulos também viram as opções do formulário de orçamento. */
export const services: Service[] = [
  {
    title: "Site institucional",
    text: "Apresenta sua empresa, seus serviços e como falar com você. É o endereço oficial do seu negócio na internet.",
    ideal: "Empresas e profissionais liberais",
  },
  {
    title: "Landing page",
    text: "Uma página só, com um objetivo só: vender um produto, captar contatos ou divulgar um lançamento.",
    ideal: "Campanhas, lançamentos e anúncios",
  },
  {
    title: "Loja virtual",
    text: "Seus produtos com fotos, preços e um caminho simples até a compra.",
    ideal: "Quem quer vender pela internet",
  },
];

/** Ação principal da página: o único botão de WhatsApp, na seção de contato. */
export const whatsapp = {
  label: "Pedir orçamento",
  number: "5511930301092",
  /** mensagem de quem pula o formulário */
  message: "Olá! Vi seu portfólio e quero um site.",
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`;

export const whatsappUrl = whatsappLink(whatsapp.message);

/** Formulário que abre ao clicar no botão do WhatsApp (components/LeadDialog.tsx). */
export const leadForm = {
  /**
   * URL do "App da Web" do Google Apps Script que salva os pedidos na sua planilha.
   * Passo a passo em scripts/leads-planilha.gs. Enquanto estiver vazia, o
   * formulário só abre o WhatsApp, sem salvar nada.
   */
  endpoint: "",
  title: "Me conta rapidinho",
  intro: "Três respostas e o WhatsApp abre com a mensagem pronta.",
  types: [...services.map((s) => s.title), "Outro"],
  privacy: "Seus dados são usados só para responder o seu pedido.",
  submit: "Continuar no WhatsApp",
  skip: "Pular e ir direto ao WhatsApp",
  doneTitle: "Pronto!",
  doneText: "O WhatsApp abriu numa nova aba com a sua mensagem. É só enviar.",
  doneRetry: "Não abriu? Toque aqui",
  /** mensagem que chega no seu WhatsApp, montada com as respostas */
  message: ({ nome, tipo }: { nome: string; tipo: string }) =>
    `Olá! Meu nome é ${nome}, vi seu portfólio e quero um orçamento de site (${tipo}).`,
};

export type ContactLink = { label: string; href: string };

/** Alternativas ao WhatsApp, exibidas abaixo do botão principal. */
export const contacts: ContactLink[] = [
  {
    label: "joaohenrique.braga@outlook.com",
    href: "mailto:joaohenrique.braga@outlook.com",
  },
  { label: "GitHub", href: "https://github.com/JoaoSyllos" },
];
