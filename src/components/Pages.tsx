import { Dodecahedron, Environment, Grid, MeshDistortMaterial, RenderTexture, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { scenes } from "../utils/scenes";
import { Scene } from "./Scene";
import CameraHandler from "./CameraHandler";

export const Pages = () => {
    const viewport = useThree((state) => state.viewport);
    const { slideDistance } = useControls({
      slideDistance: {
        value: 1,
        min: 0,
        max: 10,
      },
    });

    return (
      <>
        <ambientLight intensity={0.2} />
        <Environment preset={"city"} />
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
        {scenes.map((scene, index) => {
          return (
            <mesh
              key={index}
              position={[index * (viewport.width + slideDistance), 0, 0]}
            >
              
              {scene.path ? 
              <>
              <planeGeometry args={[viewport.width, viewport.height]} />
              <meshBasicMaterial toneMapped={false}>
                <RenderTexture attach="map">
                  <Scene {...scene}/>
                </RenderTexture>
              </meshBasicMaterial>
              </>
              : <Text 
              color="red"
              fontSize={0.1} // Ajusta el tamaño del texto según tus necesidades
              maxWidth={viewport.width * 0.8} // Establece un ancho máximo para el texto
              anchorX="center"
              anchorY="middle"
              position={[0, 0, 0.01]} // Ligeramente al frente del plano
          >
              {scene.name}
            </Text>
              }
            </mesh>
          );
        })}
      </>
    );
  };

export default Pages;