"use client";
import AboutInfo from "@/app/(about)/AboutInfo";
import ExperienceInfo from "./(experience)/ExperienceInfo";
import Link from "next/link";
import { ArrowCircleDown, ArrowUpRight } from "@phosphor-icons/react";
import IntervalLabel from "@/components/IntervalLabel";
import Carousel from "@/components/Carousel/Carousel";
import ProjectInfo from "./(projects)/ProjectInfo";
import { useEffect, useState } from "react";
import { toggleDarkMode } from "@/public/scripts/darkMode";
import { Sun, Sunglasses, House } from "@phosphor-icons/react";
import ContactInfo from "./(contact)/ContactInfo";
import ProjectCards from "./(projects)/ProjectCards";

const LABELS = [
  "Frontend Engineer",
  "Designer",
  "Photographer",
  "Creative Developer",
];

export default function Home() {
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
    <main>
      <section className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-6 flex flex-col justify-around ">
          <div className="mt-16">
            <h5>Hi, I&apos;m</h5>
            <h1>Frank Wei</h1>
            <h3>
              <IntervalLabel labels={LABELS} />
            </h3>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 my-auto mx-auto md:mr-0">
          <button
            className="button-icon"
            onClick={() => {
              toggleDarkMode();
              setDarkState(!darkState);
            }}
          >
            {!!darkState ? (
              <Sun size={"24rem"} />
            ) : (
              <Sunglasses size={"24rem"} />
            )}
          </button>
        </div>
      </section>

      <section
        id="about"
        className="grid gap-x-16 md:grid-cols-5
        [grid-template-areas:'title'_'image'_'bio']
        md:[grid-template-areas:'title_title_title_image_image'_'bio_bio_bio_image_image'] auto-rows-min md:auto-rows-auto"
      >
        <h2 className="[grid-area:title]">About</h2>
        <div
          className="flex flex-row flex-wrap-reverse md:flex-nowrap gap-x-16
               [grid-area:bio]"
        >
          <div className="mt-16 md:mt-auto w-96 border">
            <div>Now Playing</div>
          </div>
          <div className="text-sm md:text-base  md:mt-auto h-fit">
            <AboutInfo />
          </div>
        </div>
        <div
          className="border border-white w-full
            min-h-96
          [grid-area:image]"
        >
          Image
        </div>
      </section>

      <section id="experience">
        <h2>Experience</h2>
        <div className="flex flex-col justify-around gap-4">
          <div>
            <h3>Work</h3>
            <div>
              <ExperienceInfo />
            </div>
          </div>
          <div className="text-end mt-16">
            <Link
              className="hover:text-orange-600 hover:dark:text-orange-400 dark:bg-slate-500 bg-slate-200 bg-opacity-65 dark:bg-opacity-65 
            text-sm md:text-base rounded-md p-2 
            pointer-events-none opacity-65 dark:opacity-65"
              href="/Portfolio"
            >
              View Full Resume (coming soon)
            </Link>
          </div>
          <div>
            <h3>Projects</h3>
            <div>
              {/* <Carousel>{<ProjectCards />}</Carousel> */}
              <ProjectInfo />
            </div>
          </div>
          <div id="additional" className="text-sm md:text-base">
            <div>Website Todos:</div>
            <ul className="ml-4">
              <li className="flex flex-row gap-2">
                <input type="checkbox" disabled />
                maybe move data fetching to SSR
              </li>
              <li className="flex flex-row gap-2">
                <input type="checkbox" disabled />
                s3 bucket for resume download
              </li>
              <li className="flex flex-row gap-2">
                <input type="checkbox" disabled />
                add animations/ some kind of webgl thing (what I&apos;m
                currently learning!)/add images(?)/more design creativity(!!)
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="flex flex-col">
          <h4>Let&apos;s Connect!</h4>
          <h3>Reach out to me on:</h3>
          <div className="grow flex flex-col">
            <div className="border-b w-fit ml-auto self-end mt-auto mb-32">
              <ArrowUpRight size={18} className="inline" />
              <h3 className="inline">email@email.com</h3>
            </div>
          </div>
          <div className="flex flex-row gap-4 mt-auto">
            <ContactInfo />
          </div>
    
      </section>
    </main>
  );
}
