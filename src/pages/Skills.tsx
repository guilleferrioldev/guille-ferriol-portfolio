import { Canvas } from "@react-three/fiber";
import { CanvasLoader, Scene, ShowSkills, TechnicalSkills, SoftSkills } from "../components";
import { myDatabases, myLanguages, myOS, myOthers } from "../utils/skills";
import { Suspense } from "react";
import { ScenePaths, scenes } from "../utils/scenes";
import { useTranslation } from "react-i18next";

const SkillsPage = () => {
    const { t } = useTranslation();
    
    return (
        <section className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-[85%] m-5 md:m-20 mt-0 xl:mt-0 overflow-y-scroll pointer-events-auto">
            <div className="col-span-1 xl:row-span-6 bg-coffee rounded-lg p-5 pt-0 md:overflow-y-scroll md:overflow-x-auto">
                <ShowSkills skills={myLanguages} title={t("libraries")}/>
                <ShowSkills skills={myDatabases} title={t("databases")}/>
                <ShowSkills skills={myOthers} title={t("others")}/>
                <ShowSkills skills={myOS} title={t("operating systems")}/>
            </div>
            <div className="col-span-1 xl:row-span-4 bg-coffee rounded-lg p-5 md:overflow-y-scroll md:overflow-x-auto">
                <TechnicalSkills />
                <SoftSkills />
            </div>
            <div className="col-span-1 xl:row-span-4 bg-coffee rounded-lg min-h-[50vh]">
                <Canvas shadows className='rounded-lg'>
                    <ambientLight intensity={0.2} />
                    <directionalLight position={[10, 10, 5]} />
                        <Suspense fallback={<CanvasLoader color={"#3b2e23"} />}>
                            <Scene {...scenes[2]} path={ScenePaths.SKILLS}/>
                        </Suspense> 
                </Canvas>
            </div>
            <div className="xl:col-span-2 xl:row-span-2 bg-brown rounded-lg flex items-center justify-center p-20 min-h-[20vh] text-center">
                <h1 className='text-2xl md:text-8xl font-extrabold text-gray-100' >{t("always learning")}</h1>  
            </div>
            
        </section>
    )
}

export default SkillsPage;