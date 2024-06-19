"use client";
import Parallax from "@/components/Parallax";
import Experience from "./(experience)/Experience";
import About from "./(about)/About";
import Contact from "./(contact)/Contact";
import Splash from "./(splash)/Splash";
import { Boxes } from "@/components/Boxes";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main>
      <Splash />
      <Parallax>
        <About />
      </Parallax>
      <Parallax>
        <Experience />
      </Parallax>
      <Parallax>
        <Contact />
      </Parallax>

      {/* <motion.div drag className="cursor-move hidden md:block"> */}
   
      {/* </motion.div> */}
    </main>
  );
}
