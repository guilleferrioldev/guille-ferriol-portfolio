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
const TOUCH_OVERSCROLL_THRESHOLD = 50; // px pulled past a scrolled panel edge before a vertical touch changes slide
const TOUCH_FREE_THRESHOLD = 170; // px of vertical travel on a slide with no scroll panel (e.g. the 3D slide) before it changes
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

// Touch needs to tell three states apart, not two:
//   "can"  -> a scroll panel can still scroll in `dir` (let native scrolling run)
//   "edge" -> a scroll panel exists but is at its boundary (small over-pull flips)
//   "none" -> no scroll panel here at all (e.g. the 3D slide; needs a big deliberate swipe)
const touchScrollState = (start: EventTarget | null, dir: number): "can" | "edge" | "none" => {
  let el = start as HTMLElement | null;
  let foundPanel = false;
  while (el && el !== document.body) {
    const overflowY = getComputedStyle(el).overflowY;
    if (
      (overflowY === "auto" || overflowY === "scroll") &&
      el.scrollHeight > el.clientHeight + 1
    ) {
      foundPanel = true;
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if (dir > 0 && !atBottom) return "can";
      if (dir < 0 && !atTop) return "can";
    }
    el = el.parentElement;
  }
  return foundPanel ? "edge" : "none";
};

interface Props {
    isLoading: boolean
}

const Overlay = ({ isLoading }: Props) => {
    const { t } = useTranslation();
    const [slide, setSlide] = useAtom(slideAtom);
    const [displaySlide, setDisplaySlide] = useState(slide);
    const [visible, setVisible] = useState(false);
    const [atEnd, setAtEnd] = useState(false); // inner panel scrolled to its bottom (slides 1 & 2)

    const lockRef = useRef(false);   // synchronous lock for the moment a nav fires
    const wheelAccum = useRef(0);
    const lastInnerScroll = useRef(0); // timestamp of the last inner-panel scroll
    const lastWheel = useRef(0);       // timestamp of the last wheel event
    const touchStart = useRef<{ x: number; y: number } | null>(null);
    const lastTouchY = useRef(0);      // last touchmove Y, for incremental drag delta
    const touchAccum = useRef(0);      // over-pull past a panel edge, before a slide flip

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

    // Track whether the current slide's scrollable panel is at its bottom, so the
    // "swipe up" hint on slides 1 & 2 only appears once there's nothing left to read.
    useEffect(() => { setAtEnd(false); }, [slide]);
    useEffect(() => {
      const onScroll = (event: Event) => {
        const el = event.target as HTMLElement | null;
        if (!el || el.scrollHeight === undefined || el.scrollHeight <= el.clientHeight + 1) return;
        setAtEnd(el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
      };
      // capture: scroll events don't bubble, so listen on the way down.
      window.addEventListener('scroll', onScroll, { capture: true, passive: true });
      return () => window.removeEventListener('scroll', onScroll, { capture: true });
    }, []);

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

    // Touch: a horizontal swipe moves between slides; a vertical drag scrolls the
    // inner panel natively, and once that panel is at its edge, continuing to pull
    // advances the slide (the touch equivalent of the wheel-to-next behaviour, so
    // reaching the bottom on a phone flips to the next slide instead of dead-ending).
    useEffect(() => {
      const handleTouchStart = (event: TouchEvent) => {
        touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        lastTouchY.current = event.touches[0].clientY;
        touchAccum.current = 0;
      };
      const handleTouchMove = (event: TouchEvent) => {
        if (lockRef.current || !touchStart.current) return;
        const x = event.touches[0].clientX;
        const y = event.touches[0].clientY;
        const totalDx = x - touchStart.current.x;
        const totalDy = y - touchStart.current.y;
        const incDy = y - lastTouchY.current;
        lastTouchY.current = y;

        // Horizontal-dominant gesture: leave it to the swipe handler in touchend.
        if (Math.abs(totalDx) > Math.abs(totalDy)) {
          touchAccum.current = 0;
          return;
        }
        if (Math.abs(incDy) < 1) return;
        // Finger up (incDy < 0) scrolls the panel down (dir 1); finger down => up (dir -1).
        const dir = incDy < 0 ? 1 : -1;
        const state = touchScrollState(event.target, dir);

        // Inner panel can still scroll in that direction: let native scrolling run.
        if (state === "can") {
          lastInnerScroll.current = Date.now();
          touchAccum.current = 0;
          return;
        }
        // A panel just reached its edge: brief grace so the flick that finished the
        // scroll doesn't immediately flip the slide before you read the last line.
        if (state === "edge" && Date.now() - lastInnerScroll.current < BOUNDARY_GRACE_MS) {
          touchAccum.current = 0;
          return;
        }
        // No scroll panel here (the 3D slide): demand a big deliberate swipe so a
        // small gesture while looking at the model doesn't change slides.
        const threshold = state === "none" ? TOUCH_FREE_THRESHOLD : TOUCH_OVERSCROLL_THRESHOLD;
        touchAccum.current += -incDy;
        if (Math.abs(touchAccum.current) >= threshold) {
          go(touchAccum.current > 0 ? 1 : -1);
        }
      };
      const handleTouchEnd = () => {
        touchStart.current = null;
      };
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleTouchEnd);
      return () => {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
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

          <section className="absolute top-0 bottom-0 left-0 right-0 flex-1 hidden md:flex items-center justify-between p-4">
          {!isLoading && <Arrows onClickLeft={() => go(-1)} onClickRight={() => go(1)} />}
          </section>

          {!isLoading && (displaySlide === 0 || ((displaySlide === 1 || displaySlide === 2) && atEnd)) && (
            <div
              className={`md:hidden absolute bottom-10 right-6 flex flex-col items-center gap-1 animate-swipe-bob pointer-events-none ${
                displaySlide === 0 ? "text-black/80" : "text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7"
              >
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
              </svg>
              <span className="text-xs font-semibold whitespace-nowrap">{t("swipe up")}</span>
            </div>
          )}
        </main>
    );
  };


export default Overlay


const AboutMeOverlay = () => {
  const { t, i18n } = useTranslation();
  const isEs = i18n.language?.startsWith("es");
  const cvFile = isEs ? "Guillermo_Ferriol_CV_ES.pdf" : "Guillermo_Ferriol_CV_EN.pdf";

  return (
    <section className="absolute rounded-lg h-[80%] w-[85%] p-5 md:p-10 flex flex-col items-start justify-end bottom-0 md:bottom-20 left-5 md:left-20">
      <h1 className="text-xl md:text-8xl font-extrabold mb-2 md:mb-5 leading-tight">{t("hello")}</h1>
      <p className="text-sm md:text-2xl md:max-w-[55%] font-semibold leading-snug">{t("presentation")}</p>
      <div className="flex items-center flex-wrap gap-3 md:gap-4 mt-4 md:mt-5">
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
