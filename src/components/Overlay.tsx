import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { scenes } from "../utils/scenes";
import { ExperiencePage, SkillsPage } from "../pages";
import { Arrows } from ".";

export const slideAtom = atom(0);

const Overlay = () => {
    const [slide, setSlide] = useAtom(slideAtom);
    const [displaySlide, setDisplaySlide] = useState(slide);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setVisible(true);
      }, 1000);
    }, []);
  
    useEffect(() => {
      setVisible(false);
      setTimeout(() => {
        setDisplaySlide(slide);
        setVisible(true);
      }, 2600);
    }, [slide]);

    return (
        <div
          className={`fixed z-10 top-0 left-0 bottom-0 right-0 flex flex-col justify-between pointer-events-none text-black ${
            visible ? "" : "opacity-0"
          } transition-opacity duration-1000`}
        >
          
          <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full pt-0 flex flex-col">
            <h1
              className="w-full text-small md:text-2xl font-bold md:font-extrabold flex items-center justify-center h-[10%] top-0"
            >
              {scenes[displaySlide].name}
            </h1>
            { displaySlide === 0 && <AboutMeOverlay /> }
            { displaySlide === 1 && <ExperiencePage /> }
            { displaySlide === 2 && <SkillsPage /> }
          </div>

          <div className="absolute top-0 bottom-0 left-0 right-0 flex-1 flex items-center justify-between p-4">
          <Arrows onClickLeft={() => setSlide((prev) => (prev > 0 ? prev - 1 : scenes.length - 1))} onClickRight={() => setSlide((prev) => (prev < scenes.length - 1 ? prev + 1 : 0))} />
          </div>
        </div>
    );
  };
  

export default Overlay


const AboutMeOverlay = () => {
  return (
    <div className="absolute rounded-lg h-[80%] w-[80%] p-10 flex flex-col items-start justify-end bottom-0 md:bottom-20 left-5 md:left-20">
      <h1 className="text-2xl md:text-8xl font-extrabold mb-5">Hi, I'm Guille Ferriol</h1>
      <p className="text-sm md:text-2xl md:max-w-[55%] font-semibold">Sofware engineer passionate about technology and innovation, with the firm objective of facing great challenges and creating solutions that leave a mark. Motivated to work on projects that drive significant change and generate real impact.</p>
    </div>)
}