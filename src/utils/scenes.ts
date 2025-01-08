export type SceneType = {
  mainColor: string;
  name: string;
};

export const scenes = <SceneType[]>[
    {
      mainColor: "#f9c0ff",
      name: "ABOUT ME AND THE THINGS I LOVE",
    },
    {
      mainColor: "#b3e5fc",
      name: "EXPERIENCE AND PROJECTS",
    },
    {
      mainColor: "#ffdec0",
      name: "SKILLS",
    },
];

export enum ScenePaths {
  ABOUT_ME =  "models/about_me_scene.glb",
  EXPERIENCE = "models/computer.glb",
  SKILLS = "models/skills_scene.glb",
}