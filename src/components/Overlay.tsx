import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { scenes } from "../utils/scenes";
import { ExperiencePage, SkillsPage } from "../pages";

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
          
          <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full pt-0">
            <h1
              className="w-full text-2xl font-extrabold flex items-center justify-center h-[10%] top-0"
            >
              {scenes[displaySlide].name}
            </h1>

            { displaySlide === 1 && <ExperiencePage /> }
            { displaySlide === 2 && <SkillsPage /> }
          </div>

          <div className="absolute top-0 bottom-0 left-0 right-0 flex-1 flex items-center justify-between p-4 z-100">
            <svg
              onClick={() =>
                setSlide((prev) => (prev > 0 ? prev - 1 : scenes.length - 1))
              }
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
  
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer"
              onClick={() =>
                setSlide((prev) => (prev < scenes.length - 1 ? prev + 1 : 0))
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </div>
    );
  };
  

export default Overlay