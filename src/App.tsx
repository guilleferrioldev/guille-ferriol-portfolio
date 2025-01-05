import { Canvas } from "@react-three/fiber";
import { Suspense } from "react"
import { Header, Pages } from "./components";
import { Leva } from "leva";

function App() {
  return (
    <>
     <Leva hidden />
      <Header />
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
