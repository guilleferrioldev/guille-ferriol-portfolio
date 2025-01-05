type SceneType = {
  path: string; 
  mainColor: string;
  name: string;
};

export const scenes: SceneType[] = [
    {
      path: "models/about_me_scene.glb",
      mainColor: "#f9c0ff",
      name: "ABOUT ME",
    },
    {
      path: "",
      mainColor: "#c0ffe1",
      name: "EXPERIENCE AND PROJECTS",
    },
    {
      path: "models/semi_scene.glb",
      mainColor: "#ffdec0",
      name: "SKILLS",
    },
];