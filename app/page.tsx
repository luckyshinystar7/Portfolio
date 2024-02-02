"use client";
import AboutInfo from "@/app/(about)/AboutInfo";
import ContactInfo from "./(contact)/ContactInfo";
import ExperienceInfo from "./(experience)/ExperienceInfo";
import { JSX, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowCircleDown, Link as LinkIcon } from "@phosphor-icons/react";
import IntervalLabel from "@/components/IntervalLabel";
import Carousel from "@/components/Carousel/Carousel";

import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import clsx from "clsx";
import ProjectInfo from "./(projects)/ProjectInfo";

const LABELS = [
  "Frontend Engineer",
  "Designer",
  "Photographer",
  "Creative Developer",
];

export default function Home() {
  return (
    <main className="flex flex-col">
      <section id="intro" className="grid grid-cols-12 min-h-[36em]">
        <div className="col-span-12 md:col-span-6 flex flex-col justify-around">
          <div className="mt-16">
            <h5>Hi, I&apos;m</h5>
            <h1>Frank Wei</h1>
            <h3>
              <IntervalLabel labels={LABELS} />
            </h3>
          </div>
          <div>
            <button
              className="border-2 border-black leading-8
              dark:border-orange-400 rounded-sm p-4 hover:transition-colors
              text-blue-600 dark:text-white
              hover:bg-blue-400 hover:border-blue-400 hover:text-blue-100
              hover:dark:bg-orange-600 hover:dark:border-orange-600 hover:dark:text-orange-100"
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
            >
              <h5>
                Let&apos;s Connect
                <ArrowCircleDown className="inline-flex ml-2" size={32} />
              </h5>
            </button>
          </div>
        </div>
      </section>
      <section id="about">
        <h2>About</h2>
        <div className="text-sm md:text-base">
          <AboutInfo />
        </div>
        {/* <div>
          <div>Now Playing</div>
        </div> */}
      </section>
      <section id="experience">
        <h2>Experience</h2>
        <div>
          <ExperienceInfo />
        </div>
        <div className="text-center md:text-end mt-16">
          <Link
            className="hover:text-orange-600 hover:dark:text-orange-400 dark:bg-slate-500 bg-slate-200 bg-opacity-65 dark:bg-opacity-65 
            text-sm md:text-base rounded-md p-2 
            pointer-events-none opacity-65 dark:opacity-65"
            href="/Portfolio"
          >
            View Full Resume (coming soon)
          </Link>
        </div>
      </section>
      <section id="projects">
        <h2>Projects</h2>
        <div className="mb-8">
          <Carousel>{<ProjectInfo />}</Carousel>
        </div>
      </section>
      <div id="additional" className="text-sm md:text-base">
        <div>Website Todos:</div>
        <ul className="ml-4">
          <li className="flex flex-row gap-2">
            <input type="checkbox" disabled />
            maybe move data fetching to SSR (thinking about trade-offs if I want
            to use context for animations or something)
          </li>

          <li className="flex flex-row gap-2">
            <input type="checkbox" disabled />
            s3 bucket for resume download
          </li>
          <li className="flex flex-row gap-2">
            <input type="checkbox" disabled />
            add framer motion/GSAP animations (what I&apos;m currently
            learning!)/add images(?)/more design creativity(!!)
          </li>
        </ul>
      </div>
    </main>
  );
}
