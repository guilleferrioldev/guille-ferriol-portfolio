import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { myProjects } from '../../utils/experience';
import { useState } from 'react';
import { Arrows, DisplaySvgs } from '..';

const projectCount = myProjects.length;

const Slider = () => {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

    const handleNavigation = (direction: 'next' | 'previous') => {
        setSelectedProjectIndex((prevIndex) => {
          if (direction === 'previous') {
            return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
          } else {
            return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
          }
        });
      };

    useGSAP(() => {
        gsap.fromTo(`.animatedText`, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' });
    }, [selectedProjectIndex]);

    const currentProject = myProjects[selectedProjectIndex];

    return (
      <div className="w-full h-full flex flex-col justify-between items-center p-5 relative"> 
        <div className="w-full flex flex-col gap-5 text-white-600 mt-5 mb-5">
          <p className="text-2xl font-semibold animatedText">{currentProject.name}</p>
          <p className="animatedText">{currentProject.description}</p>
        </div>
  
        <section className='w-full'>
          <div className="w-full flex flex-wrap justify-between items-center gap-5 mb-7">
              <DisplaySvgs svgs={currentProject.technologies ?? []} className='bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg hover:bg-opacity-100'/>
              
            {currentProject.href && (
                  <a
                    className="flex items-center gap-2 cursor-pointer text-white-600 pointer-events-auto 
                      absolute top-3 right-5 md:static md:top-auto md:right-auto"
                    href={currentProject.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p>Link</p>
                    <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
                  </a>
                )}
            </div>
  
            <div className="w-full flex justify-center gap-5 md:justify-between items-center pointer-events-auto">
              <Arrows onClickLeft={() => handleNavigation('previous')} onClickRight={() => handleNavigation('next')} />
            </div>
        </section>
      </div>
    );
}

export default Slider;