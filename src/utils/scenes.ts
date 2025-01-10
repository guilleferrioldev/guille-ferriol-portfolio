export type SceneType = {
  mainColor: string;
  name: string;
};

export const scenes = <SceneType[]>[
    {
      mainColor: "#f9c0ff",
      name: "",
    },
    {
      mainColor: "#b3e5fc",
      name: "experience and projects",
    },
    {
      mainColor: "#ffdec0",
      name: "skills",
    },
];

export enum ScenePaths {
  ABOUT_ME =  "models/about_me_scene.glb",
  EXPERIENCE = "models/computer.glb",
  SKILLS = "models/skills_scene.glb",
}