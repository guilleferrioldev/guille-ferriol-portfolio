import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { scenes } from "../utils/scenes";
import { ExperiencePage, SkillsPage } from "../pages";
import { Arrows, DisplaySvgs, SelectLanguage } from ".";
import { myLinks } from "../utils/aboutMe";
import { useTranslation } from "react-i18next";

export const slideAtom = atom(0);

interface Props {
    isLoading: boolean
}

const Overlay = ({ isLoading }: Props) => {
    const { t } = useTranslation();
    const [slide, setSlide] = useAtom(slideAtom);
    const [displaySlide, setDisplaySlide] = useState(slide);
    const [visible, setVisible] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        setVisible(true);
      }, 0);
    }, []);
  
    useEffect(() => {
     setIsTransitioning(true);
     setVisible(false);
    setTimeout(() => {
       setDisplaySlide(slide);
       setVisible(true);
       setIsTransitioning(false)
    }, 2600);
  }, [slide]);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (isTransitioning) return;

        if (event.key === 'ArrowLeft') {
          setSlide((prev) => (prev > 0 ? prev - 1 : scenes.length - 1));
        } else if (event.key === 'ArrowRight') {
          setSlide((prev) => (prev < scenes.length - 1 ? prev + 1 : 0));
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [setSlide, isTransitioning]);

    const handleArrowClickLeft = () => {
      if (isTransitioning) return;
      setSlide((prev) => (prev > 0 ? prev - 1 : scenes.length - 1));
    }
    const handleArrowClickRight = () => {
      if (isTransitioning) return;
      setSlide((prev) => (prev < scenes.length - 1 ? prev + 1 : 0));
    }


    return (
        <main
          className={`fixed z-10 top-0 left-0 bottom-0 right-0 flex flex-col justify-between pointer-events-none text-black ${
            visible ? "" : "opacity-0"
          } transition-opacity duration-1000`}
        >
          
          <section className="absolute top-0 bottom-0 left-0 right-0 w-full h-full pt-0 flex flex-col">
            <div className={`w-full text-small md:text-2xl font-bold md:font-extrabold flex items-center justify-between h-[10%] top-0 p-5 pr-5 ${displaySlide === 0 ? "md:pr-5" : "md:pr-20"}`}>
              <h2 className="opacity-0 hidden md:block">Guille Ferriol</h2>
              <h1>
                {t(scenes[displaySlide].name)}
              </h1>
              <SelectLanguage />
            </div>
          
            { displaySlide === 0 && <AboutMeOverlay /> }
            { displaySlide === 1 && <ExperiencePage /> }
            { displaySlide === 2 && <SkillsPage /> }
          </section>

          <section className="absolute top-0 bottom-0 left-0 right-0 flex-1 flex items-center justify-between p-4">
          {!isLoading && <Arrows onClickLeft={handleArrowClickLeft} onClickRight={handleArrowClickRight} />}
          </section>
        </main>
    );
  };
  

export default Overlay


const AboutMeOverlay = () => {
  const { t } = useTranslation();

  return (
    <section className="absolute rounded-lg h-[80%] w-[80%] p-10 flex flex-col items-start justify-end bottom-0 md:bottom-20 left-5 md:left-20">
      <h1 className="text-2xl md:text-8xl font-extrabold mb-5">{t("hello")}</h1>
      <p className="text-sm md:text-2xl md:max-w-[55%] font-semibold">{t("presentation")}</p>
      <DisplaySvgs svgs={myLinks} className="border-2 border-gray-900 border-opacity-80 hover:border-opacity-100 mt-5"/>
    </section>)
}