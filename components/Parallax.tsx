"use client";
import { useState, useRef, useLayoutEffect, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type ParallaxProps = {
  children: ReactNode;
  offset?: number;
};

const Parallax = ({ children, offset = 50 }: ParallaxProps): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();

  const initial = elementTop - clientHeight;
  const final = elementTop + offset;

  const yRange = useTransform(scrollY, [initial, final], [offset, -offset]);
  const y = useSpring(yRange, { stiffness: 400, damping: 90 });

  useLayoutEffect(() => {
    const element = parallaxRef.current;
    const onResize = () => {
      const offsetTop = element?.getBoundingClientRect()
        ? element.getBoundingClientRect().top
        : 0;
      setElementTop(offsetTop + window.scrollY);
      setClientHeight(window.innerHeight);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [parallaxRef]);

  console.log('wtf2', elementTop, clientHeight)
  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div ref={parallaxRef} style={{ y }}>
      {children}
    </motion.div>
  );
};

export default Parallax;
