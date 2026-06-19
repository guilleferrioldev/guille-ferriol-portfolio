import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { myProjects } from '../../utils/experience';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Arrows, DisplaySvgs } from '..';
import { useTranslation } from 'react-i18next';

const projectCount = myProjects.length;

const Slider = () => {
  const { t } = useTranslation();
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const timeoutRef = useRef<number>(0); 

  const handleNavigation = useCallback((direction: 'next' | 'previous') => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
    resetTimeout(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const resetTimeout = useCallback(() => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current); 
        }
        timeoutRef.current = setTimeout(() => {
          handleNavigation('next');
        }, 10000);
      }, [handleNavigation]);
  
    useEffect(() => {
        resetTimeout();
    
        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        };
      }, [resetTimeout]);

    useGSAP(() => {
        gsap.fromTo(`.animatedText`, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' });
    }, [selectedProjectIndex]);

    const currentProject = myProjects[selectedProjectIndex];

    return (
      <div className="w-full h-full flex flex-col justify-between items-center p-5 relative"> 
        <section className="w-full flex flex-col gap-5 text-white-600 mt-5 mb-5 flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <p className="text-2xl font-semibold animatedText">{t(currentProject.name)}</p>
          <p className="animatedText">{t(currentProject.description)}</p>
          <p className="animatedText">{t(currentProject.learning)}</p>
        </section>
  
        <section className='w-full shrink-0'>
          <div className="w-full flex flex-wrap justify-start items-center gap-3 mb-5">
              <DisplaySvgs svgs={currentProject.technologies ?? []} className='bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg hover:bg-opacity-100'/>
              
            {currentProject.href && (
                  <a
                    className="flex items-center gap-2 cursor-pointer text-white-600 pointer-events-auto"
                    href={currentProject.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p>Link</p>
                    <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
                  </a>
                )}
            </div>
  
            <div className="mx-auto w-fit flex justify-center gap-6 items-center pointer-events-auto bg-gray-900/60 rounded-full px-4 py-1 text-white">
              <Arrows onClickLeft={() => handleNavigation('previous')} onClickRight={() => handleNavigation('next')} />
            </div>
        </section>
      </div>
    );
}

export default Slider;