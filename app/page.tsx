"use client";
import AboutInfo from "@/app/(about)/AboutInfo";
import ExperienceInfo from "./(experience)/ExperienceInfo";
import Link from "next/link";
import { ArrowCircleDown, ArrowUpRight } from "@phosphor-icons/react";
import IntervalLabel from "@/components/IntervalLabel";
import Carousel from "@/components/Carousel/Carousel";
import ProjectInfo from "./(projects)/ProjectInfo";
import { useEffect, useRef, useState } from "react";
import { toggleDarkMode } from "@/public/scripts/darkMode";
import { Sun, Sunglasses, House } from "@phosphor-icons/react";
import ContactInfo from "./(contact)/ContactInfo";
import ProjectCards from "./(projects)/ProjectCards";
import { motion, } from "framer-motion";

const LABELS = [
  "Frontend Engineer",
  "Designer",
  "Photographer",
  "Creative Developer",
];

export default function Home() {
  const [darkState, setDarkState] = useState<boolean>(false);
  const welcomeRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

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
    <main>
      <section
        ref={welcomeRef}
        className="grid grid-cols-2 auto-rows-min md:auto-rows-auto"
      >
        <div className="col-span-2 md:col-span-1">
          <div className="md:mt-64">
            <motion.h5
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Hi, I&apos;m
            </motion.h5>
            <h1>Frank Wei</h1>
          </div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <IntervalLabel labels={LABELS} />
          </motion.h3>
        </div>
        <div className="col-span-2 md:col-span-1 mt-16 md:my-auto mx-auto">
          <motion.button
            className="button-icon hover:text-theme-hover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true, amount: 0.5 }}
            onClick={() => {
              toggleDarkMode();
              setDarkState(!darkState);
            }}
          >
            {!!darkState ? (
              <Sun size={"20rem"} />
            ) : (
              <Sunglasses size={"20rem"} />
            )}
          </motion.button>
        </div>
      </section>

      <section
        ref={aboutRef}
        id="about"
        className="grid gap-x-16 grid-cols-1 md:grid-cols-5
        [grid-template-areas:'title'_'image'_'bio']
        md:[grid-template-areas:'title_title_title_image_image'_'bio_bio_bio_image_image'] auto-rows-min md:auto-rows-auto"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.5 }}
          className="[grid-area:title]"
        >
          About
        </motion.h2>
        <motion.div
          className="flex flex-row flex-wrap-reverse md:flex-nowrap gap-x-16
               [grid-area:bio]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* <div className="mt-16 md:mt-auto w-96 border">
            <div>Now Playing</div>
          </div> */}
          <div className="text-sm md:text-base  md:mt-auto h-fit">
            <AboutInfo />
          </div>
        </motion.div>
        <motion.div
          className="w-full bg-base-300 dark:bg-base-100 rounded-md bg-opacity-65 dark:bg-opacity-65
            min-h-96
          [grid-area:image] p-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Image Coming Soon :)
        </motion.div>
      </section>

      <section ref={experienceRef} id="experience">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Experience
        </motion.h2>
        <div className="flex flex-col justify-around gap-4">
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Work
            </motion.h3>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <ExperienceInfo />
              <div className="text-end mt-16">
                <Link
                  className="hover:text-orange-600 hover:dark:text-orange-400 dark:bg-base-300 bg-base-200 bg-opacity-65 dark:bg-opacity-65 
            text-sm md:text-base rounded-md p-2 
            pointer-events-none opacity-65 dark:opacity-65"
                  href="/Portfolio"
                >
                  View Full Resume (coming soon)
                </Link>
              </div>
            </motion.div>
          </div>
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Projects
            </motion.h3>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <ProjectInfo />
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={contactRef} id="contact" className="flex flex-col">
        <motion.h4
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Let&apos;s Connect!
        </motion.h4>
        <h3>Reach out to me on:</h3>
        <div className="grow flex flex-col">
          <div className="border-b w-fit ml-auto self-end mt-auto mb-32 hover:anchor-hover text-theme border-theme hover:text-theme-hover">
            <ArrowUpRight size={32} className="inline" />
            <h3 className="inline ">email@(coming soon)</h3>
          </div>
        </div>
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <ContactInfo />
        </motion.div> */}
                <ContactInfo />
      </section>
    </main>
  );
}
