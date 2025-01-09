import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react"
import { Overlay, CanvasLoader } from "./components";
import { Leva } from "leva";
import { Pages } from "./pages";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <>
     <Leva hidden />
      <Overlay isLoading={isLoading}/>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
      <Suspense fallback={<CanvasLoader setIsLoading={setIsLoading} color={'transparent'}/>}>
        <Pages />
      </Suspense>
    </Canvas>
    </>
  )
}

export default App
