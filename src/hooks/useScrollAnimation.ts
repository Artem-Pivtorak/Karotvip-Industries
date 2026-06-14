import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationType = "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn" | "countUp";

interface UseScrollAnimationOptions {
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  end?: number;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    animation = "fadeInUp",
    delay = 0,
    duration = 0.6,
    stagger = 0,
    start = "top 85%",
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let fromVars: gsap.TweenVars = {};
    let toVars: gsap.TweenVars = {
      duration,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none none",
      },
    };

    switch (animation) {
      case "fadeInUp":
        fromVars = { opacity: 0, y: 30 };
        toVars = { ...toVars, opacity: 1, y: 0 };
        break;
      case "fadeInLeft":
        fromVars = { opacity: 0, x: -30 };
        toVars = { ...toVars, opacity: 1, x: 0 };
        break;
      case "fadeInRight":
        fromVars = { opacity: 0, x: 30 };
        toVars = { ...toVars, opacity: 1, x: 0 };
        break;
      case "scaleIn":
        fromVars = { opacity: 0, scale: 0.9 };
        toVars = { ...toVars, opacity: 1, scale: 1, ease: "back.out(1.5)" };
        break;
      case "countUp":
        fromVars = { opacity: 0, y: 20 };
        toVars = { ...toVars, opacity: 1, y: 0 };
        break;
    }

    if (stagger > 0) {
      const children = element.children;
      gsap.fromTo(children, fromVars, { ...toVars, stagger });
    } else {
      gsap.fromTo(element, fromVars, toVars);
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [animation, delay, duration, stagger, start]);

  return ref;
}
