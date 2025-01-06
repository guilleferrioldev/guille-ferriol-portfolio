import { Canvas } from "@react-three/fiber";
import { Suspense } from "react"
import { Overlay } from "./components";
import { Leva } from "leva";
import { Pages } from "./pages";

function App() {
  return (
    <>
     <Leva hidden />
      <Overlay />
      <Suspense fallback={<p>Loading...</p>}>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
        <Pages />
    </Canvas>
    </Suspense>

    </>
  )
}

export default App
