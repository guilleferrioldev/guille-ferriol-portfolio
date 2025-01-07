import { Canvas } from "@react-three/fiber";
import { Suspense } from "react"
import { Overlay, CanvasLoader } from "./components";
import { Leva } from "leva";
import { Pages } from "./pages";

function App() {
  return (
    <>
     <Leva hidden />
      <Overlay />
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
      <Suspense fallback={<CanvasLoader />}>
        <Pages />
      </Suspense>
    </Canvas>
    </>
  )
}

export default App
