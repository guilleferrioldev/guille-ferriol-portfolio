export type WorkExperience = {
    id: number;
    name: string;
    pos: string;
    duration: string;
    text: string;
    icon: string;
  };

export const workExperiences = <WorkExperience[]>[
    {
      id: 1,
      name: 'CUJAE',
      pos: 'Architecture Student',
      duration: '2019 - 2021',
      text: "CUJAE serves as my go-to tool for creating interactive prototypes. I use it to bring designs to  life, allowing stakeholders to experience the user flow and interactions before development.",
      icon: "cujae_logo.png",
    },
    {
      id: 2,
      name: 'MATCOM',
      pos: 'Data Science Student',
      duration: '2022 - 2024',
      text: "Figma is my collaborative design platform of choice. I utilize it to work seamlessly with team members and clients, facilitating real-time feedback and design iterations. Its cloud-based.",
      icon: 'matcom_logo.png',
    },
    {
      id: 3,
      name: 'Bufetes Colectivos',
      pos: 'Full Stack Developer',
      duration: '2023 - 2024',
      text: "Notion helps me keep my projects organized. I use it for project management, task tracking, and as a central hub for documentation, ensuring that everything from design notes to.",
      icon: 'bufetes_logo.png',
    },
    {
        id: 4,
        name: 'Countigo',
        pos: 'Frontend Developer',
        duration: '2024 - Present',
        text: "Figma is my collaborative design platform of choice. I utilize it to work seamlessly with team members and clients, facilitating real-time feedback and design iterations. Its cloud-based.",
        icon: 'countigo_logo.jpg',
    }
  ];

export type Technologies = {
  id: number;
  name: string;
  path: string
}

export type Project = {
  id: number;
  name: string;
  description: string; 
  href?: string;
  technologies?: Technologies[];
}

export const myProjects = <Project[]>[
  {
    id: 1,
    name: 'My Own X',
    description: 'A personal project to learn in-depth about tools and applications, recreating technologies from scratch.',
    href: 'https://github.com/guilleferrioldev/my-own-x',
    technologies: [{
        id: 1,
        name: "Golang",
        path: "assets/golang.svg"
      },
      {
        id: 2,
        name: "Python",
        path: "assets/python.svg"
      }
    ]
  },
  {
    id: 2,
    name: 'Law Firm Assurance',
    description: 'Collective Law Firm Assurance Management System ',
    technologies: [{
        id: 2,
        name: "Typescript",
        path: "assets/typescript.svg"
      },
      {
        id: 2, 
        name: "React",
        path: "assets/react.svg"
      },
      {
        id: 3,
        name: "Next.js",
        path: "assets/nextjs.svg"
      },
      {
        id: 4,
        name: "Golang",
        path: "assets/golang.svg"
      },
      {
        id: 5,
        name: "Fiber",
        path: "assets/fiber.svg"
      },
      {
        id: 6,
        name: "Postgres",
        path: "assets/postgresql.svg"
      }
    ]
  },
  {
    id: 3,
    name: 'Medicinal Plants',
    description: 'Medicinal plant recommendation system. This system will take into account both the textual information about people\'s suffering and show them plants that can help them.',
    href: 'https://github.com/guilleferrioldev/medicinal-plants',
    technologies: [{
        id: 2,
        name: "Typescript",
        path: "assets/typescript.svg"
      },
      {
        id: 2, 
        name: "React",
        path: "assets/react.svg"
      },
      {
        id: 3,
        name: "Next.js",
        path: "assets/nextjs.svg"
      },
      {
        id: 4,
        name: "Python",
        path: "assets/python.svg"
      },
      {
        id: 5,
        name: "Fast Api",
        path: "assets/fastapi.svg"
      },
      {
        id: 6,
        name: "Scikit-learn",
        path: "assets/scikit-learn.svg"
      }
    ]
  },
  {
    id: 4,
    name: 'Suite TV',
    description: ' Este proyecto utiliza una arquitectura de microfrontends implementada mediante Module Federation, lo que permite la integración modular con el sitio principal. El panel de administración incluye autenticación con NextAuth, una interfaz avanzada construida con Ant Design y servicios REST desarrollados con Java Spring. Está diseñado para la gestión eficiente de usuarios, suscripciones y productos.',
    technologies: [{
        id: 1,
        name: "Typescript",
        path: "assets/typescript.svg"
      },
      {
        id: 2, 
        name: "React",
        path: "assets/react.svg"
      },
      {
        id: 3,
        name: "Next.js",
        path: "assets/nextjs.svg"
      },
      {
        id: 4, 
        name: "Next Auth",
        path: "assets/next-auth.png"
      },
      {
        id: 5,
        name: "Ant Design",
        path: "assets/ant-design.svg"
      },
      {
        id: 6,
        name: "Module Federation",
        path: "assets/module_federation.png"
      },
      {
        id: 7,
        name: "Zustand",
        path: "assets/zustand.svg"
      }
    ]
  },
  {
    id: 5,
    name: 'Count Tv',
    description: 'Algorithms, Data Structures and Design Patterns implemented in Python. Programming concepts.',
    technologies: [{
        id: 1,
        name: "Typescript",
        path: "assets/typescript.svg"
      },
      {
        id: 2, 
        name: "React",
        path: "assets/react.svg"
      },
      {
        id: 3,
        name: "Next.js",
        path: "assets/nextjs.svg"
      },
      {
        id: 4,
        name: "Ant Design",
        path: "assets/ant-design.svg"
      },
      {
        id: 5, 
        name: "Tailwind CSS",
        path: "assets/tailwindcss.svg"
      },
      {
        id: 6,
        name: "Redux",
        path: "assets/redux.svg"
      }
    ]
  },
  {
    id: 5,
    name: 'Software Engineer Skills ',
    description: 'Algorithms, Data Structures and Design Patterns implemented in Python. Programming concepts.',
    href: 'https://github.com/guilleferrioldev/software-engineer-skills',
    technologies: [{
        id: 1,
        name: "Python",
        path: "assets/python.svg"
      },
    ]
  },
  {
    id: 6,
    name: 'Addictions in Havana',
    description: 'Statistical study on the offer of addictive products in Old Havana in June 2023',
    href: 'https://github.com/guilleferrioldev/adicciones-hv',
    technologies: [{
        id: 1,
        name: "Python",
        path: "assets/python.svg"
      },
      {
        id: 2,
        name: "Pandas",
        path: "assets/pandas.svg"
      },
      {
        id: 3,
        name: "NumPy",
        path: "assets/numpy.svg"
      },
    ]
  },
  {
    id: 7,
    name: 'Study of climante change',
    description: 'Un estudio sobre el cambio climático en cuba',
    href: 'https://github.com/guilleferrioldev/study-of-climate-change-in-Cuba',
    technologies: [{
        id: 1,
        name: "Python",
        path: "assets/python.svg"
      },
      {
        id: 2,
        name: "Pandas",
        path: "assets/pandas.svg"
      },
      {
        id: 3,
        name: "NumPy",
        path: "assets/numpy.svg"
      },
      {
        id: 4,
        name: "Matplotlib", 
        path: "assets/matplotlib.svg"
      },
      {
        id: 5,
        name: "Streamlit",
        path: "assets/streamlit.svg"
      },
    ]
  },
  {
    id: 8,
    name: "Cinemapedia",
    description: "Cinemapedia is a movie database that provides information about movies, actors, directors, and more. It is a project that aims to create a comprehensive database of movies and their associated information.",
    technologies: [{
      id: 1,
      name: "Dart",
      path: "assets/dart.svg"
      },
      {
        id: 2,
        name: "Flutter",
        path: "assets/flutter.svg"
      }]
    },
]