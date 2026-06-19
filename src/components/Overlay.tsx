import { atom, useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import { scenes } from "../utils/scenes";
import { ExperiencePage, SkillsPage } from "../pages";
import { Arrows, DisplaySvgs, SelectLanguage } from ".";
import { myLinks } from "../utils/aboutMe";
import { useTranslation } from "react-i18next";

export const slideAtom = atom(0);
// True while the camera is mid-animation between slides. Navigation stays
// locked until this clears, so a fast input can't overlap the camera pan.
export const transitioningAtom = atom(false);

const TRANSITION_MS = 2600;
const WHEEL_THRESHOLD = 120; // accumulated deltaY before a wheel gesture changes slide
const SWIPE_THRESHOLD = 60; // px of horizontal travel before a swipe changes slide
const BOUNDARY_GRACE_MS = 500; // after the inner panel hits its edge, hold before a wheel can change slide
const WHEEL_IDLE_MS = 220; // gap with no wheel events that begins a fresh gesture

// Walk up from `start`; return true if a scrollable ancestor can still scroll in
// `dir` (down = 1, up = -1). Used so the inner panel scrolls to its end before a
// wheel gesture flips to the next/previous slide.
const canInnerScroll = (start: EventTarget | null, dir: number): boolean => {
  let el = start as HTMLElement | null;
  while (el && el !== document.body) {
    const overflowY = getComputedStyle(el).overflowY;
    if (
      (overflowY === "auto" || overflowY === "scroll") &&
      el.scrollHeight > el.clientHeight + 1
    ) {
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if (dir > 0 && !atBottom) return true;
      if (dir < 0 && !atTop) return true;
    }
    el = el.parentElement;
  }
  return false;
};

interface Props {
    isLoading: boolean
}

const Overlay = ({ isLoading }: Props) => {
    const { t } = useTranslation();
    const [slide, setSlide] = useAtom(slideAtom);
    const [displaySlide, setDisplaySlide] = useState(slide);
    const [visible, setVisible] = useState(false);

    const lockRef = useRef(false);   // synchronous lock for the moment a nav fires
    const wheelAccum = useRef(0);
    const lastInnerScroll = useRef(0); // timestamp of the last inner-panel scroll
    const lastWheel = useRef(0);       // timestamp of the last wheel event
    const touchStart = useRef<{ x: number; y: number } | null>(null);

    // Mirror the camera-animation flag into a ref so the event listeners
    // (keydown/wheel/touch) always read its latest value.
    const transitioning = useAtomValue(transitioningAtom);
    const cameraBusy = useRef(false);
    useEffect(() => { cameraBusy.current = transitioning; }, [transitioning]);

    useEffect(() => {
      const id = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(id);
    }, []);

    // Cross-fade the overlay and hold a lock for the whole transition so any
    // input fired mid-transition is ignored (only one step per gesture).
    useEffect(() => {
     lockRef.current = true;
     setVisible(false);
     const id = setTimeout(() => {
       setDisplaySlide(slide);
       setVisible(true);
       lockRef.current = false;
       wheelAccum.current = 0;
    }, TRANSITION_MS);
    return () => clearTimeout(id);
  }, [slide]);

    // Single guarded navigation entry point shared by arrows, keys, wheel, swipe.
    const go = useCallback((dir: number) => {
      // Blocked while the overlay lock is held OR the camera is still animating.
      if (lockRef.current || cameraBusy.current) return;
      lockRef.current = true;               // synchronous lock => exactly one step
      wheelAccum.current = 0;
      setSlide((prev) =>
        dir > 0
          ? (prev < scenes.length - 1 ? prev + 1 : 0)
          : (prev > 0 ? prev - 1 : scenes.length - 1)
      );
    }, [setSlide]);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowLeft') go(-1);
        else if (event.key === 'ArrowRight') go(1);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [go]);

    // Wheel: vertical scroll moves between slides, but only once the inner panel
    // (e.g. the Skills list) has scrolled to its top/bottom boundary.
    useEffect(() => {
      const handleWheel = (event: WheelEvent) => {
        if (lockRef.current) return;
        const dir = event.deltaY > 0 ? 1 : -1;
        const now = Date.now();

        // Inner panel can still scroll: let it, and remember when it last did.
        if (canInnerScroll(event.target, dir)) {
          lastInnerScroll.current = now;
          wheelAccum.current = 0;
          return;
        }
        // Just reached the panel's edge: hold a grace window so the momentum
        // that finished the scroll doesn't flip the slide before you finish
        // reading the last line. A deliberate scroll after the pause advances.
        if (now - lastInnerScroll.current < BOUNDARY_GRACE_MS) {
          wheelAccum.current = 0;
          return;
        }
        // A pause since the last wheel event starts a fresh accumulation.
        if (now - lastWheel.current > WHEEL_IDLE_MS) wheelAccum.current = 0;
        lastWheel.current = now;

        wheelAccum.current += event.deltaY;
        if (Math.abs(wheelAccum.current) >= WHEEL_THRESHOLD) {
          event.preventDefault();
          go(wheelAccum.current > 0 ? 1 : -1);
        }
      };
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => window.removeEventListener('wheel', handleWheel);
    }, [go]);

    // Touch: a horizontal swipe moves between slides; vertical drags fall through
    // to native scrolling of the inner panel.
    useEffect(() => {
      const handleTouchStart = (event: TouchEvent) => {
        touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      };
      const handleTouchEnd = (event: TouchEvent) => {
        if (!touchStart.current || lockRef.current) return;
        const dx = event.changedTouches[0].clientX - touchStart.current.x;
        const dy = event.changedTouches[0].clientY - touchStart.current.y;
        touchStart.current = null;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) >= SWIPE_THRESHOLD) {
          go(dx < 0 ? 1 : -1); // swipe left => next, swipe right => previous
        }
      };
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchend', handleTouchEnd);
      return () => {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }, [go]);


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
          {!isLoading && <Arrows onClickLeft={() => go(-1)} onClickRight={() => go(1)} />}
          </section>
        </main>
    );
  };


export default Overlay


const AboutMeOverlay = () => {
  const { t, i18n } = useTranslation();
  const isEs = i18n.language?.startsWith("es");
  const cvFile = isEs ? "Guillermo_Ferriol_CV_ES.pdf" : "Guillermo_Ferriol_CV_EN.pdf";

  return (
    <section className="absolute rounded-lg h-[80%] w-[80%] p-10 flex flex-col items-start justify-end bottom-0 md:bottom-20 left-5 md:left-20">
      <h1 className="text-2xl md:text-8xl font-extrabold mb-5">{t("hello")}</h1>
      <p className="text-sm md:text-2xl md:max-w-[55%] font-semibold">{t("presentation")}</p>
      <div className="flex items-center flex-wrap gap-4 mt-5">
        <DisplaySvgs svgs={myLinks} className="border-2 border-gray-900 border-opacity-80 hover:border-opacity-100"/>
        <a
          href={`/${cvFile}`}
          download={cvFile}
          className="pointer-events-auto inline-flex items-center gap-2 h-10 px-4 rounded-md text-sm font-semibold text-white bg-brown border-2 border-gray-900 border-opacity-80 hover:border-opacity-100 hover:bg-coffee transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {t("download cv")}
        </a>
      </div>
    </section>)
}
