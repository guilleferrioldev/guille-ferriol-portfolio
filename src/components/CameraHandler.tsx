import { useAtom, useSetAtom } from "jotai";
import {  useEffect, useRef } from "react";
import { slideAtom, transitioningAtom } from "./Overlay";
import { useThree } from "@react-three/fiber";
import {
  CameraControls,

} from "@react-three/drei";

const CameraHandler = ({ slideDistance }: { slideDistance: number }) => {
    const viewport = useThree((state) => state.viewport);
    const cameraControls = useRef<CameraControls | null>(null);
    const [slide] = useAtom(slideAtom);
    const setTransitioning = useSetAtom(transitioningAtom);
    const lastSlide = useRef(0);

    const dollyDistance = 10;

    const moveToSlide = async () => {
      setTransitioning(true);
      try {
        await cameraControls.current?.setLookAt(
          lastSlide.current * (viewport.width + slideDistance),
          3,
          dollyDistance,
          lastSlide.current * (viewport.width + slideDistance),
          0,
          0,
          true
        );
        await cameraControls.current?.setLookAt(
          (slide + 1) * (viewport.width + slideDistance),
          1,
          dollyDistance,
          slide * (viewport.width + slideDistance),
          0,
          0,
          true
        );

        await cameraControls.current?.setLookAt(
          slide * (viewport.width + slideDistance),
          0,
          5,
          slide * (viewport.width + slideDistance),
          0,
          0,
          true
        );
      } finally {
        setTransitioning(false);
      }
    };
  
    useEffect(() => {
      // Used to reset the camera position when the viewport changes
      const resetTimeout = setTimeout(() => {
        cameraControls.current?.setLookAt(
          slide * (viewport.width + slideDistance),
          0,
          5,
          slide * (viewport.width + slideDistance),
          0,
          0
        );
      }, 200);
      return () => clearTimeout(resetTimeout);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewport]);
  
    useEffect(() => {
      if (lastSlide.current === slide) {
        return;
      }
      moveToSlide();
      lastSlide.current = slide;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slide]);
    return (
      <CameraControls
        ref={cameraControls}
        touches={{
          one: 0,
          two: 0,
          three: 0,
        }}
        mouseButtons={{
          left: 0,
          middle: 0,
          right: 0,
          wheel: 0,
        }}
      />
    );
  };
export default CameraHandler;