import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import { DemoComputer, Timeline, Slider, CanvasLoader } from '../components';
import { useTranslation } from 'react-i18next';

const ExperiencePage = () => {
    const {t} = useTranslation();

    return (
        <section className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-[85%] m-5 md:m-20 mt-0 xl:mt-0 overflow-y-scroll pointer-events-auto text-gray-900">
            <div className="col-span-1 xl:col-start-1 xl:row-start-1 xl:row-span-4 bg-my-blue rounded-lg min-h-[50vh] xl:min-h-0">
                  <Slider />
            </div>
            <div className="col-span-1 xl:col-start-3 xl:row-start-1 xl:row-span-6 bg-my-blue rounded-lg cursor-pointer min-h-[50vh] xl:min-h-0 md:overflow-y-scroll md:overflow-x-auto">
                <Timeline/>
            </div>
            <div className="col-span-1 xl:col-start-2 xl:row-start-1 xl:row-span-4 bg-gray-900 rounded-lg cursor-pointer min-h-[30vh]">
            <Canvas className='rounded-lg'>
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense fallback={<CanvasLoader color={"#111827"} />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer />
                </group>
              </Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
          </Canvas>
            </div>
            <div className="col-span-1 xl:col-start-1 xl:col-span-2 xl:row-start-5 xl:row-span-2 bg-gray-900 rounded-lg flex items-center justify-center p-8 md:p-12 min-h-[20vh] text-center overflow-hidden">
                <h1 className='w-full text-2xl md:text-4xl lg:text-5xl xl:text-8xl font-extrabold text-gray-100 leading-tight break-words' >{t("work together")}</h1>
            </div>
        </section>
    )
}

export default ExperiencePage;
