import { workExperiences } from "../../utils/experience";

const Timeline = () => {
    return (
        <ul className="w-full h-full">
            {workExperiences.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[auto_1fr] items-start gap-5 rounded-lg sm:px-5 px-2.5 transition-all ease-in-out duration-500 cursor-pointer hover:bg-gray-800  group">
                  <div className="flex flex-col h-full justify-start items-center py-2">
                    <div className="rounded-3xl w-16 h-16 p-2">
                      <img className="w-full h-full rounded-lg" src={item.icon} alt="" />
                    </div>

                    <div className="flex-1 w-0.5 mt-4 h-full bg-gray-500 group-last:hidden" />
                  </div>

                  <div className="group-hover:text-white transition-all ease-in-out duration-500 sm:p-5 px-2.5 py-5">
                    <p className="font-bold text-white-800">{item.name}</p>
                    <p className="text-sm mb-1">
                      {item.pos} -- <span>{item.duration}</span>
                    </p>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
        </ul>
    )
}

export default Timeline;