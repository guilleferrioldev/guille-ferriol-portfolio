import { Technology } from ".";

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
      pos: 'architecture student',
      duration: '2019 - 2021',
      text: "cujae description",
      icon: "cujae_logo.png",
    },
    {
      id: 2,
      name: 'MATCOM',
      pos: "data scince student",
      duration: '2022 - 2024',
      text: "matcom description",
      icon: 'matcom_logo.png',
    },
    {
      id: 3,
      name: 'Bufetes Colectivos',
      pos: "full stack developer",
      duration: '2023 - 2024',
      text: "onbc description",
      icon: 'bufetes_logo.png',
    },
    {
        id: 4,
        name: 'Countigo',
        pos: 'frontend developer',
        duration: "current time",
        text: "countigo description",
        icon: 'countigo_logo.jpg',
    }
  ];

export type Project = {
  id: number;
  name: string;
  description: string; 
  learning: string;
  href?: string;
  technologies?: Technology[];
}

export const myProjects = <Project[]>[
  {
    id: 1,
    name: "law firm assurance",
    description: "law firm assurance description",
    learning: "law firm assurance learning",
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
    id: 2,
    name: 'medicinal plant recommendation system',
    description: 'medicinal plant recommendation system description',
    learning: 'medicinal plant recommendation system learning',
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
    id: 3,
    name: 'Suite TV',
    description: "suitetv description",
    learning: "suitetv learning",
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
    id: 4,
    name: 'Count TV',
    description: "countv description",
    learning: "countv learning",
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
    name: 'My Own X',
    description: "my own x description",
    learning: "my own x learning",
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
    id: 6,
    name: "software engineer skills",
    description: "software engineer skills description",
    learning: "software engineer skills learning",
    href: 'https://github.com/guilleferrioldev/software-engineer-skills',
    technologies: [{
        id: 1,
        name: "Python",
        path: "assets/python.svg"
      },
    ]
  },
  {
    id: 7,
    name: 'programming problems solved',
    description: "programming problems solved description",
    learning: "programming problems solved learning",
    href: 'https://github.com/guilleferrioldev/programming-problems-solved',
    technologies: [{
        id: 1,
        name: "Python",
        path: "assets/python.svg"
      },
    ]
  },
  {
    id: 8,
    name: "addictions",
    description: "addictions description",
    learning: "addictions learning",
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
      { id: 4, 
        name: "Matplotlib",
        path: "assets/matplotlib.svg" 
      }, 
      { id: 5, 
        name: "Plotly",
        path: "assets/plotly.svg" 
      }
    ]
  },
  {
    id: 9,
    name: "climate change",
    description: "climate change description",
    learning: "climate change learning",
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
    id: 10,
    name: "Cinemapedia",
    description: "cinemapedia description",
    learning: "cinemapedia learning",
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