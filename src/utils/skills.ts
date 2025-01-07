import { Technology } from ".";

export type TechnicalSkill = {
    id: number;
    name: string;
}

export type Skill = {
    id: number;
    languange?: Technology[];
    libraries?: Technology[];
}

export const myLanguages = <Skill[]>[
    {
        id: 1,
        languange: [{
            id: 1,
            name: "Typescript",
            path: "assets/typescript.svg"
          },
        ],
        libraries: [{
            id: 1,
            name: "React",
            path: "assets/react.svg"
          },
          {
            id: 2,
            name: "Next.js",
            path: "assets/nextjs.svg"
          },
          
          {
            id: 3,
            name: "Ant Design",
            path: "assets/ant-design.svg"
          },
          {
            id: 4,
            name: "Redux",
            path: "assets/redux.svg"
          },
          {
            id: 5,
            name: "Tailwind CSS",
            path: "assets/tailwindcss.svg"
          },
          {
            id: 6,
            name: "Zustand",
            path: "assets/zustand.svg"
          },
          {
            id: 7,
            name: "Module Federation",
            path: "assets/module_federation.png"
          },
        ]
    },
    {
        id: 2,
        languange: [{
            id: 1,
            name: "Python",
            path: "assets/python.svg"
          },
        ],
        libraries: [{
            id: 1,
            name: "Fastapi",
            path: "assets/fastapi.svg"
          },
          {
            id: 2,
            name: "NumPy",
            path: "assets/numpy.svg"
          },
          {
            id: 3,
            name: "Pandas",
            path: "assets/pandas.svg"
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
          {
            id: 6,
            name: "Scikit-learn",
            path: "assets/scikit-learn.svg"
          }
        ]
    },
    {
        id: 3,
        languange: [{
            id: 1,
            name: "Golang",
            path: "assets/golang.svg"
          },
        ],
        libraries: [{
            id: 1,
            name: "Fiber",
            path: "assets/fiber.svg"
          },
          {
            id: 2,
            name: "Grpc",
            path: "assets/grpc.svg"
          },
          {
            id: 3,
            name: "Nats",
            path: "assets/nats.jpg"
          },
        ]
    },
    {
        id: 4,
        languange: [{
            id: 1, 
            name: "Dart",
            path: "assets/dart.svg"
        }],
        libraries: [{
            id: 1,
            name: "Flutter",
            path: "assets/flutter.svg"
        }]
    },
    {
        id: 5,
        languange: [{
            id: 1, 
            name: "Bash",
            path: "assets/bash.svg"
        }],
    }
]

export const myDatabases = <Skill[]>[
    {
        id: 1,
        libraries: [{
            id: 1, 
            name: "Postgres",
            path: "assets/postgresql.svg"
          },
          {
            id: 2, 
            name: "SQLite",
            path: "assets/sqlite.svg"
          },
          {
            id: 1, 
            name: "Cassandra",
            path: "assets/cassandra.svg"
        },
        {
          id: 1, 
          name: "Scylla",
          path: "assets/scylladb.png"
        }
      ],
    }
]


export const myOthers = <Skill[]>[
    {
        id: 1,
        libraries: [{
            id: 1, 
            name: "Docker",
            path: "assets/docker.svg"
          },
          {
            id: 2, 
            name: "Postman",
            path: "assets/postman.svg"
          },
          {
            id: 3, 
            name: "Git",
            path: "assets/git.svg"
          },
          {
            id: 4, 
            name: "RabbitMQ",
            path: "assets/rabbitmq.svg"
          },
          {
            id: 5,
            name: "Kafka",
            path: "assets/kafka.svg"
          }
      ],
    }
]

export const myOS = <Skill[]>[
    {
        id: 1,
        libraries: [{
            id: 1, 
            name: "Arch Linux",
            path: "assets/archlinux.svg"
          },
      ],
    }
]