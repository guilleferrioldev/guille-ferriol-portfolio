import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import { DemoComputer } from '../components';

const ExperiencePage = () => {
    return (
        <section className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-[85%] m-5 md:m-20 mt-0 xl:mt-0 overflow-y-scroll">
            <div className="col-span-1 xl:row-span-4 bg-my-blue rounded-lg">
                       1 
            </div>
            <div className="col-span-1 xl:row-span-4 bg-gray-900 rounded-lg">
            <Canvas>
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer />
                </group>
              </Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
          </Canvas> 
            </div>
            <div className="col-span-1 xl:row-span-6 bg-my-blue rounded-lg">
                        3
            </div>
            <div className="xl:col-span-2 xl:row-span-2 bg-my-blue rounded-lg">
                       4
            </div>
        </section>
    )
}

export default ExperiencePage;