"use client";
import { motion } from "framer-motion";
import AboutInfo from "./AboutInfo";
import AboutImage from "./AboutImage";

export default function About() {
  return (
    <section
      id="about"
      className="grid gap-x-16 grid-cols-1 md:grid-cols-5
  [grid-template-areas:'title'_'image'_'bio'_'playlist']
  md:[grid-template-areas:'title_title_title_playlist_playlist'_'bio_bio_bio_image_image'] auto-rows-min md:auto-rows-auto"
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
      {/* <motion.div
      className="[grid-area:playlist] mt-8 md:mt-0"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 2 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="w-full h-40 border">Now Playing</div>
    </motion.div> */}
      <motion.div
        className="flex flex-row flex-wrap-reverse md:flex-nowrap gap-x-16
         [grid-area:bio] "
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="text-sm md:text-base md:mt-auto h-fit pointer-events-none ">
          <AboutInfo />
        </div>
      </motion.div>
      <motion.div
        className="mt-auto [grid-area:image] flex flex-col justify-between gap-8 "
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="w-full">
          <AboutImage />
        </div>
      </motion.div>
    </section>
  );
}
