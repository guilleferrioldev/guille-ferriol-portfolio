import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useState } from "react"
import { Overlay, CanvasLoader } from "./components";
import { Pages } from "./pages";

// Rendered as a sibling of <Pages> inside the Suspense boundary, so it only
// mounts once the scene (incl. the about-me model) has actually resolved.
// That makes it a deterministic "scene ready" signal, regardless of cache hits.
function SceneReady({ onReady }: { onReady: () => void }) {
  useEffect(() => { onReady(); }, [onReady]);
  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleReady = useCallback(() => setIsLoading(false), []);

  return (
    <>
      <Overlay isLoading={isLoading}/>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
      <Suspense fallback={<CanvasLoader color={'transparent'}/>}>
        <Pages />
        <SceneReady onReady={handleReady} />
      </Suspense>
    </Canvas>
    </>
  )
}

export default App
