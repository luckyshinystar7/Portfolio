"use client";
import { motion } from "framer-motion";
import { Typewriter } from "@/components/Typewriter";
import { TextSequenceEffect } from "@/components/TextSequence";
import IntervalLabel from "@/components/IntervalLabel";
import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { toggleDarkMode } from "@/public/scripts/darkMode";

const LABELS = ["Software Developer", "Designer", "Photographer"];

export default function Splash() {
  const [darkState, setDarkState] = useState<boolean>(false);

  useEffect(() => {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkState(true);
    } else {
      setDarkState(false);
    }
  }, []);

  return (
    <section
      id="home"
      className="grid grid-cols-2 auto-rows-min md:auto-rows-auto"
    >
      <div className="col-span-2 md:col-span-1  md:my-auto">
        <div className="">
          <Typewriter
            className="text-left text-lg md:text-xl flex items-start"
            cursorClassName="hidden"
            words={[{ text: "Hi" }, { text: "," }, { text: "I'm" }]}
          />
          <TextSequenceEffect
            words="Frank Wei"
            className="text-6xl md:text-8xl"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-lg md:text-xl"
        >
          <IntervalLabel labels={LABELS} />
        </motion.div>
      </div>
      <div className="col-span-2 md:col-span-1 mt-32 md:my-auto mx-auto">
        <motion.button
          // drag
          aria-label="dark mode toggle"
          className="button-icon hover:text-theme-hover group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.5 }}
          whileHover={{ scale: 1.2, transition: { y: 6 } }}
          onClick={() => {
            toggleDarkMode();
            setDarkState(!darkState);
          }}
        >
          {!!darkState ? (
            <Sun
              size={"20rem"}
              // className="group-hover:animate-bounce ease-in-out"
            />
          ) : (
            <Moon
              size={"20rem"}
              // className="group-hover:animate-bounce ease-in-out"
            />
          )}
        </motion.button>
      </div>
    </section>
  );
}
