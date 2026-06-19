import { Canvas } from "@react-three/fiber";
import { CanvasLoader, Scene, ShowSkills, TechnicalSkills, SoftSkills, AISkills } from "../components";
import { myDatabases, myLanguages, myOS, myOthers } from "../utils/skills";
import { Suspense } from "react";
import { ScenePaths, scenes } from "../utils/scenes";
import { useTranslation } from "react-i18next";

const SkillsPage = () => {
    const { t } = useTranslation();
    
    return (
        <section className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-[85%] m-5 md:m-20 mt-0 xl:mt-0 overflow-y-scroll pointer-events-auto">
            <div className="col-span-1 xl:row-span-6 bg-coffee rounded-lg p-5 pt-0 xl:min-h-0 xl:overflow-y-auto xl:overflow-x-hidden">
                <ShowSkills skills={myLanguages} title={t("libraries")}/>
                <ShowSkills skills={myDatabases} title={t("databases")}/>
                <ShowSkills skills={myOthers} title={t("others")}/>
                <ShowSkills skills={myOS} title={t("operating systems")}/>
            </div>
            <div className="col-span-1 xl:row-span-4 bg-coffee rounded-lg p-4 xl:min-h-0 overflow-visible xl:overflow-y-auto">
                <TechnicalSkills />
                <SoftSkills />
                <AISkills />
            </div>
            <div className="col-span-1 xl:row-span-4 bg-coffee rounded-lg relative overflow-hidden min-h-[30vh] h-[40vh] xl:h-auto">
                <Canvas shadows className='rounded-lg'>
                    <ambientLight intensity={0.2} />
                    <directionalLight position={[10, 10, 5]} />
                        <Suspense fallback={<CanvasLoader color={"#3b2e23"} />}>
                            <Scene {...scenes[2]} path={ScenePaths.SKILLS}/>
                        </Suspense> 
                </Canvas>
            </div>
            <div className="xl:col-span-2 xl:row-span-2 bg-brown rounded-lg flex items-center justify-center p-8 md:p-12 min-h-[20vh] text-center overflow-hidden">
                <h1 className='w-full text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-100 leading-tight break-words' >{t("always learning")}</h1>
            </div>
            
        </section>
    )
}

export default SkillsPage;