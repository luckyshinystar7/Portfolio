"use client";
import Parallax from "@/components/Parallax";
import Experience from "./(experience)/Experience";
import About from "./(about)/About";
import Contact from "./(contact)/Contact";
import Splash from "./(splash)/Splash";

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
    </main>
  );
}
