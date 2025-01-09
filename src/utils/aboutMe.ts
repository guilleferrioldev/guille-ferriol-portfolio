export type Links = {
  id: number;
  name: string; 
  path?: string;
  href?: string;
}

export const myLinks = <Links[]>[
  {
    id: 1,
    name: "Github",
    path: "assets/github.svg",
    href: "https://github.com/guilleferrioldev",
  },
  {
    id: 2,
    name: "Linkedin",
    path: "assets/linkedin.svg",
    href: "https://www.linkedin.com/in/guillermo-ferriol-ravelo-20933720b/",
  },
  {
    id: 3,
    name: "X",
    path: "assets/x.svg",
    href: "https://x.com/guilleferriol",
  },
]