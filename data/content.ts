export const sections = {
  projetos: { id: "projetos", label: "Projetos" },
  skills: { id: "skills", label: "Skills" },
  contato: { id: "contato", label: "Contato" },
} as const;

export const navItems = Object.values(sections);

export const site = {
  brand: "DEV.",
  tagline: "código pensado, não gerado.",
  year: 2026,
};

export const marquee = [
  "Escrito à mão",
  "Arquitetura primeiro",
  "Revisado linha por linha",
  "Sem copiar e colar",
  "Código pensado, não gerado",
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

export const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "CSS avançado",
  "SQL",
  "Git",
  "Arquitetura de sistemas",
];

export type ContactLink = { label: string; href: string; primary?: boolean };

export const contacts: ContactLink[] = [
  { label: "WhatsApp", href: "https://wa.me/5511930301092", primary: true },

  {
    label: "joaohenrique.braga@outlook.com",
    href: "mailto:joaohenrique.braga@outlook.com",
  },
  { label: "GitHub", href: "https://github.com/JoaoSyllos" },
];
