"use client";
import AboutInfo from "@/components/AboutInfo";
import ContactInfo from "./contact/ContactInfo";
import ExperienceInfo from "./(experience)/ExperienceInfo";
import { JSX, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowCircleDown, ArrowUpRight } from "@phosphor-icons/react";
import IntervalLabel from "@/components/IntervalLabel";
import Carousel from "@/components/Carousel/Carousel";

import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import clsx from "clsx";

const LABELS = [
  "Frontend Engineer",
  "Designer",
  "Photographer",
  "Creative Developer",
];

export default function Home() {
  const query = `query project($id: String!) {
    project(id: $id) {
      projectCollection(limit: 100) {
        total
        items {
          ... on ProjectItem {
            projectItemTitle
            projectItemSkills
            projectItemHyperlink
            projectItemDescription {
              json
            }
            projectItemThumbnail{
              url
            }
          }
        }
      }
    }
  }`;
  const variables = {
    id: "2Ntf4X5iFJuQLlnbWXhbWM",
  };

  const { data, error, isLoading } = useQuery<any>({
    queryKey: ["project", variables?.id],
    queryFn: async () =>
      await request(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
        query,
        variables,
        {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
          "content-type": "application/json",
        }
      ),
  });

  //TODO: move this into use client
  const projectCards = useMemo<JSX.Element[] | undefined>(() => {
    if (data?.project?.projectCollection?.items?.length > 0) {
      const projectData: JSX.Element[] = [];
      data?.project?.projectCollection?.items.map(
        (
          item: {
            projectItemDescription: any;
            projectItemHyperlink: string;
            projectItemSkills: string[];
            projectItemTitle: string;
            projectItemThumbnail: { url: string };
          },
          index: number
        ) => {
          projectData.push(
            <div
              className={clsx(
                "min-h-52 min-w-52 max-w-96 border-2 rounded-md p-4 grid gap-4",
                item.projectItemThumbnail?.url &&
                  "[grid-template-areas:'text_text_text_text_text'_'text_text_text_text_text'_'text_text_text_text_text'_'skills_skills_skills_skills_skills'] md:[grid-template-areas:'image_image_text_text_text'_'image_image_text_text_text'_'image_image_text_text_text'_'skills_skills_skills_skills_skills']",
                !item.projectItemThumbnail?.url &&
                  "[grid-template-areas:'text_text_text_text_text'_'text_text_text_text_text'_'text_text_text_text_text'_'skills_skills_skills_skills_skills']"
              )}
              key={`${item.projectItemTitle}_card`}
            >
              {item.projectItemThumbnail?.url && (
                <Image
                  src={item?.projectItemThumbnail?.url}
                  alt={`${item.projectItemTitle}_thumbnail`}
                  height={100}
                  width={300}
                  className="col-span-2 border rounded-md h-full w-full invisible md:visible
                    [grid-area:image]
                    "
                />
              )}
              <div className="[grid-area:text]">
                <div
                  className="flex flex-row justify-between gap-4 h-fit
              "
                >
                  <span className="leading-6 p-1">{item.projectItemTitle}</span>
                  <Link
                    href={item?.projectItemHyperlink}
                    passHref
                    target="_blank"
                  >
                    <div className="hover:bg-slate-200 hover:dark:bg-slate-500 bg-opacity-65 dark:bg-opacity-65 p-1 h-fit rounded-md my-auto ">
                      <ArrowUpRight className="inline" size={24} />
                    </div>
                  </Link>
                </div>

                <div>
                  {documentToReactComponents(item?.projectItemDescription.json)}
                </div>
              </div>
              <div
                className="flex flex-row gap-4 pb-1
              [grid-area:skills]
              "
              >
                {item?.projectItemSkills?.map((skill: string, index) => (
                  <div
                    className="col-span-1 p-1 rounded-md bg-slate-500 bg-opacity-65 h-fit"
                    key={`${item.projectItemTitle}_skill_${index}`}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          );
        }
      );
      return projectData;
    }
  }, [data]);

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
              dark:border-white rounded-sm p-4 hover:transition-colors
              hover:bg-orange-600 hover:border-orange-600 hover:text-orange-100
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
        <div>
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
            className="hover:text-orange-600 hover:dark:text-orange-400 dark:bg-slate-500 bg-slate-200 bg-opacity-65 dark:bg-opacity-65 rounded-md p-2 pointer-events-none opacity-60"
            href="/Portfolio"
          >
            View Full Resume (coming soon)
          </Link>
        </div>
      </section>
      <section id="projects">
        <h2>Projects</h2>
        <div className="md:mx-32 overflow-hidden mb-8">
          {projectCards && (
            <Carousel>{projectCards?.map((item: any) => item)}</Carousel>
          )}
        </div>
      </section>
      <div id="additional">
        <h5>Website Todos:</h5>
        <ul className="ml-4">
          <li className="flex flex-row gap-2">
            <input type="checkbox" disabled />
            come up with better mobile UI for header and
            &ldquo;Experience&rdquo;
          </li>
          <li className="flex flex-row gap-2">
            <input type="checkbox" disabled />
            move data fetching to SSR/add more &apos;use client&apos; directives
          </li>
          <li className="flex flex-row gap-2">
            <input type="checkbox" disabled />
            add mail server for email form & captcha, s3 bucket for resume
            download
          </li>
          <li className="flex flex-row gap-2">
            <input type="checkbox" disabled />
            add framer motion/GSAP animations/more design creativity/make logo
          </li>
        </ul>
      </div>
    </main>
  );
}
