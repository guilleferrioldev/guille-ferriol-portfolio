
import { ShowSkills, TechnicalSkills } from "../components";
import { myDatabases, myLanguages, myOS, myOthers } from "../utils/skills";

const SkillsPage = () => {
    return (
        <section className="grid xl:grid-cols-6 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-[85%] m-5 md:m-20 mt-0 xl:mt-0 overflow-y-scroll pointer-events-auto">
            <div className="col-span-2 xl:row-span-6 bg-coffee rounded-lg p-5 pt-0 md:overflow-y-scroll md:overflow-x-auto">
                <ShowSkills skills={myLanguages} title={"Languages, Libraries and Frameworks"}/>
                <ShowSkills skills={myDatabases} title={"Databases"}/>
                <ShowSkills skills={myOthers} title={"Others"}/>
                <ShowSkills skills={myOS} title={"Operating Systems"}/>
            </div>
            <div className="col-span-2 xl:row-span-4 bg-coffee rounded-lg p-5 md:overflow-y-scroll md:overflow-x-auto">
                <TechnicalSkills />
                {/* <SoftSkills /> */}
            </div>
            <div className="col-span-2 xl:row-span-4 bg-coffee rounded-lg p-5">
                        3
            </div>
            <div className="xl:col-span-4 xl:row-span-2 bg-brown rounded-lg flex items-center justify-center min-h-[20vh] md:min-h-auto">
                <h1 className='text-2xl md:text-8xl font-extrabold text-gray-100' >Always Learning</h1>  
            </div>
            
        </section>
    )
}

export default SkillsPage;