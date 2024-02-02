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
                "min-h-52 border-2 rounded-md p-4 grid gap-4 text-sm md:text-base min-w-80",
                // item.projectItemThumbnail?.url &&
                //   "[grid-template-areas:'text_text_text_text_text'_'text_text_text_text_text'_'text_text_text_text_text'_'skills_skills_skills_skills_skills'] md:[grid-template-areas:'image_image_text_text_text'_'image_image_text_text_text'_'image_image_text_text_text'_'skills_skills_skills_skills_skills']",
                // !item.projectItemThumbnail?.url &&
                "[grid-template-areas:'text_text_text_text_text'_'text_text_text_text_text'_'text_text_text_text_text'_'skills_skills_skills_skills_skills']"
              )}
              key={`${item.projectItemTitle}_card`}
            >
              {/* {item.projectItemThumbnail?.url && (
                <Image
                  src={item?.projectItemThumbnail?.url}
                  alt={`${item.projectItemTitle}_thumbnail`}
                  height={100}
                  width={300}
                  className="col-span-2 border rounded-md h-full w-full invisible md:visible
                    [grid-area:image]
                    "
                />
              )} */}
              <div className="[grid-area:text]">
                <div
                  className="flex flex-row justify-between gap-4
              "
                >
                  <h5 className="leading-6 p-1 inline">
                    {item.projectItemTitle}
                  </h5>
                  <Link href={item?.projectItemHyperlink} target="_blank">
                    <button className="button-hover button-icon w-8">
                      <LinkIcon className="inline" size={16} />
                    </button>
                  </Link>
                </div>

                <div className="text-blue-600 dark:text-orange-400 break-words ">
                  {documentToReactComponents(item?.projectItemDescription.json)}
                </div>
              </div>
              <div
                className="flex flex-row gap-4 pb-1 items-end
              [grid-area:skills]
              "
              >
                {item?.projectItemSkills?.map((skill: string, index) => (
                  <div
                    className="col-span-1 p-1 rounded-md bg-slate-200 dark:bg-slate-500 bg-opacity-65 h-fit text-nowrap"
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
          {projectCards && (
            <Carousel>{projectCards?.map((item: any) => item)}</Carousel>
          )}
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
