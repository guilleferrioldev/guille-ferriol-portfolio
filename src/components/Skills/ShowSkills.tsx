import { Skill } from "../../utils/skills";
import DisplaySvgs from "../DisplaySvgs";

const ShowSkills = ({ skills, title }: { skills: Skill[], title: string }) => {
    return (
        <div className="flex flex-col gap-5 text-white-600 mt-5 mb-5">
            <h1 className="md:text-2xl font-semibold text-brown">{title}</h1>
           {
            skills.map((skill, index) => (
                <div key={index} className={skill.languange && "flex gap-5"}>
                    <DisplaySvgs svgs={skill.languange ?? []} 
                        className="bg-brown bg-opacity-80 backdrop-filter backdrop-blur-lg hover:bg-opacity-100"
                        divClassName="flex flex-col"
                    />
                    {skill.libraries && 
                    <DisplaySvgs svgs={skill.libraries} 
                        className="bg-brown bg-opacity-80 backdrop-filter backdrop-blur-lg hover:bg-opacity-100"
                        divClassName={skill.languange && "border-l-2 border-gray-900 pl-5"}
                    />}
                </div>
            ))
           }
         </div>
    )
}

export default ShowSkills;