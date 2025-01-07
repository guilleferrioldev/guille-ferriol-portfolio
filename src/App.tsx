import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react"
import { Overlay, CanvasLoader } from "./components";
import { Leva } from "leva";
import { Pages } from "./pages";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
     <Leva hidden />
      {isLoading  && <Overlay />}
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
      <Suspense fallback={<CanvasLoader setIsLoading={setIsLoading} />}>
        <Pages />
      </Suspense>
    </Canvas>
    </>
  )
}

export default App
