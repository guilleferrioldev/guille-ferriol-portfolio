import { Dodecahedron, Environment, Grid, Lightformer, MeshDistortMaterial, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { scenes, ScenePaths } from "../utils/scenes";
import { CameraHandler } from "../components";
import { AboutMePage } from ".";

export const Pages = () => {
    const viewport = useThree((state) => state.viewport);
    const slideDistance = 1;

    return (
      <>
        <ambientLight intensity={0.2} />
        {/* Procedural IBL — no remote HDR fetch (replaces preset="city") */}
        <Environment resolution={256}>
          <Lightformer intensity={2} position={[0, 5, -5]} scale={[10, 10, 1]} />
          <Lightformer intensity={1} position={[5, 1, 1]} scale={[10, 10, 1]} color="white" />
          <Lightformer intensity={1} position={[-5, -1, 1]} scale={[10, 10, 1]} color="white" />
        </Environment>
        <CameraHandler slideDistance={slideDistance} />
        {/* MAIN WORLD */}
        <group>
        <mesh position-y={viewport.height / 2 + 1.5}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial color={scenes[0].mainColor} speed={3} />
        </mesh>

        <mesh
          position-x={viewport.width + slideDistance}
          position-y={viewport.height / 2 + 1.5}
        >
          <boxGeometry />
          <MeshDistortMaterial color={scenes[1].mainColor} speed={3} />
        </mesh>

        <Dodecahedron
          position-x={2 * (viewport.width + slideDistance)}
          position-y={viewport.height / 2 + 1.5}
        >
          <MeshDistortMaterial color={scenes[2].mainColor} speed={3} />
        </Dodecahedron>
      </group>
  
        <Grid
          position-y={-viewport.height / 2}
          sectionSize={1}
          sectionColor={"purple"}
          sectionThickness={1}
          cellSize={0.5}
          cellColor={"#6f6f6f"}
          cellThickness={0.6}
          infiniteGrid
          fadeDistance={50}
          fadeStrength={5}
        />
          <AboutMePage scene={scenes[0]} viewport={viewport}/>
      </>
    );
  };

// Warm the first-visible model (slide 0). Same key string Scene's useGLTF uses.
useGLTF.preload(ScenePaths.ABOUT_ME);

export default Pages;