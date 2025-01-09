import { useRef, useState, useEffect } from 'react';
import { RenderTexture } from "@react-three/drei";
import { ScenePaths, SceneType } from "../utils/scenes";
import { Scene } from "../components";
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

interface Props {
  scene: SceneType;
  viewport: any;
}

const AboutMePage = ({ scene, viewport }: Props) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    setShowScene(true);
  }, []);

  const springProps = useSpring({
    opacity: showScene ? 1 : 0,
    config: { duration: 150 }, 
  });

  return (
      <animated.mesh ref={meshRef}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <animated.meshBasicMaterial 
          toneMapped={false} 
          transparent
          opacity={springProps.opacity}
          >
          <RenderTexture attach="map">
            <Scene {...scene} path={ScenePaths.ABOUT_ME} />
          </RenderTexture>
        </animated.meshBasicMaterial>
      </animated.mesh>
  );
};

export default AboutMePage;

