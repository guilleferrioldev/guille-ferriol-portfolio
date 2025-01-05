type SceneType = {
  path: string; 
  mainColor: string;
  name: string;
};

export const scenes: SceneType[] = [
    {
      path: "models/cybertruck_scene.glb",
      mainColor: "#f9c0ff",
      name: "ABOUT ME",
    },
    {
      path: "models/model3_scene.glb",
      mainColor: "#c0ffe1",
      name: "EXPERIENCE AND PROJECTS",
    },
    {
      path: "models/semi_scene.glb",
      mainColor: "#ffdec0",
      name: "SKILLS",
    },
];