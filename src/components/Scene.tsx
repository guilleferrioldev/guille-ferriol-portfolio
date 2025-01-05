import {
  AccumulativeShadows,
  Environment,
  Lightformer,
  OrbitControls,
  PerspectiveCamera,
  RandomizedLight,
  Sphere,
  useGLTF,
} from "@react-three/drei";

import * as THREE from "three";

import  { useEffect, useMemo, useState } from "react";
import { useThree } from "@react-three/fiber";
import { slideAtom } from "./Header";
import { useAtom } from "jotai";

export const Scene = ({ mainColor, path, ...props }: {mainColor: string, path: string}) => {
  const [slide] = useAtom(slideAtom);
  const DEG2RAD = Math.PI / 180;
  const { scene } = useGLTF(path);
  const [selectedObject, setSelectedObject] = useState<THREE.Object3D | null>(null);
  const [raycaster] = useState(() => new THREE.Raycaster())
  const pointer = useMemo(() => new THREE.Vector2(), [])
  const { camera, gl } = useThree();
  
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isObject3D) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  const handleClick = (event: MouseEvent) => {
    if (slide !== 0) {
      setSelectedObject(null);
      gl.domElement.style.cursor = 'auto';
      return; // Si raycasting es falso, salimos de la función sin realizar el raycasting
   }
    // 1. Calculate normalized mouse coordinates
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 2. Update raycaster from camera and mouse position
    raycaster.setFromCamera(pointer, camera);

    // 3. Find intersected objects
    const intersects = raycaster.intersectObjects(scene.children, true);

     // 4. If there are any intersections, select the closest one
    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;

      // Traverse up to find the top-level object in your scene to select it,
      // assuming you want to select a top-level model not a child.
      let topLevelObject = clickedObject;
      while (topLevelObject.parent && topLevelObject.parent !== scene) {
         topLevelObject = topLevelObject.parent;
      }
        setSelectedObject(topLevelObject);        
    }else{
        setSelectedObject(null)
    }
  };

  useEffect(() => {
    gl.domElement.addEventListener('click', handleClick);

    return () => {
      gl.domElement.removeEventListener('click', handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, scene, raycaster, slide]); 

  useEffect(() => {
    if (selectedObject) {
        console.log(selectedObject.id)
    }
  }, [selectedObject]);

  const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));
  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <group {...props} dispose={null}>
        <PerspectiveCamera makeDefault position={[3, 3, 8]} near={0.5} />
        <OrbitControls
          autoRotate
          enablePan={false}
          maxPolarAngle={DEG2RAD * 75}
          minDistance={6}
          maxDistance={10}
          autoRotateSpeed={0.5}
        />
        {scene && <primitive object={scene} scale={ratioScale}/>} 
        <ambientLight intensity={0.1} color="pink" />
        <AccumulativeShadows
          frames={100}
          alphaTest={0.9}
          scale={30}
          position={[0, -0.005, 0]}
          color="pink"
          opacity={0.8}
        >
          <RandomizedLight
            amount={4}
            radius={9}
            intensity={0.8}
            ambient={0.25}
            position={[10, 5, 15]}
          />
          <RandomizedLight
            amount={4}
            radius={5}
            intensity={0.5}
            position={[-5, 5, 15]}
            bias={0.001}
          />
        </AccumulativeShadows>
        <Environment blur={0.8} background>
          <Sphere scale={15}>
            <meshBasicMaterial color={mainColor} side={THREE.BackSide} />
          </Sphere>
          <Lightformer
            position={[5, 0, -5]}
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={1} // power level (optional = 1)
            color="red" // (optional = white)
            scale={[3, 5, 0]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />

          <Lightformer
            position={[-5, 0, 1]}
            form="circle" // circle | ring | rect (optional, default = rect)
            intensity={1} // power level (optional = 1)
            color="green" // (optional = white)
            scale={[2, 5, 0]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />

          <Lightformer
            position={[0, 5, -2]}
            form="ring" // circle | ring | rect (optional, default = rect)
            intensity={0.5} // power level (optional = 1)
            color="orange" // (optional = white)
            scale={[10, 5, 0]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />
          <Lightformer
            position={[0, 0, 5]}
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={1} // power level (optional = 1)
            color="purple" // (optional = white)
            scale={[10, 5, 0]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />
        </Environment>
      </group>
    </>
  );
};

useGLTF.preload("/models/cybertruck_scene.glb");
useGLTF.preload("/models/model3_scene.glb");
useGLTF.preload("/models/semi_scene.glb");
