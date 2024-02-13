"use client";
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createRef, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Link as LinkIcon, ArrowUpRight } from "@phosphor-icons/react";
import { useBreakpoint } from "@/utils/hooks/useBreakpoint";
import { motion } from "framer-motion";

interface ProjectItemType {
  projectItemDescription: any;
  projectItemHyperlink: string;
  projectItemSkills: string[];
  projectItemTitle: string;
  projectItemThumbnail?: { url: string };
}

export default function ProjectInfo() {
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

  const [showMoreProjects, setShowMoreProjects] = useState<boolean>(false);
  const revealRef = useRef(null);
  const listRef = createRef<HTMLDivElement>();
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

  const { isAboveMd, isBelowMd, md } = useBreakpoint("md");
  const LinkRow = ({
    projectItemDescription,
    projectItemHyperlink,
    projectItemSkills,
    projectItemTitle,
  }: ProjectItemType) => {
    return (
      <Link href={projectItemHyperlink} target="_blank" passHref>
        <li
          className="grid grid-cols-3 md:grid-cols-12 gap-x-8 border-b-2 py-4 pl-4 group hover:text-theme-hover hover:border-theme-hover
          [grid-template-areas:'title_title_link'_'info_info_info'] 
          md:[grid-template-areas:'title_title_title_title_info_info_info_info_info_info_info_link']"
        >
          <h5
            className="my-auto text-theme group-hover:text-theme-hover
      [grid-area:title]"
          >
            {projectItemTitle}
          </h5>
          <div
            className="flex-col gap-2 flex
      [grid-area:info]"
          >
            {documentToReactComponents(projectItemDescription.json)}
            <div className="flex flex-row gap-2 flex-wrap">
              {projectItemSkills?.map((skill: string, index) => (
                <div
                  className="pill"
                  key={`${projectItemTitle}_skill_${index}`}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div
            className=" my-auto ml-auto
      [grid-area:link]"
          >
            <ArrowUpRight className="inline" size={24} />
          </div>
        </li>
      </Link>
    );
  };

  return (
    <motion.div layout ref={listRef} transition={{ when: "beforeChildren" }}>
      <motion.ul
        className="flex flex-col"
        initial={{ opacity: 0, left: -100 }}
        animate={{ opacity: 1, left: 0 }}
        transition={{ staggerChildren: 4, delayChildren: 20 }}
      >
        {isBelowMd && data?.project?.projectCollection?.items.length > 2 ? (
          <>
            {data?.project?.projectCollection?.items
              .slice(0, 2)
              .map((item: ProjectItemType, index: number) => (
                <LinkRow
                  projectItemDescription={item?.projectItemDescription}
                  projectItemHyperlink={item?.projectItemHyperlink}
                  projectItemSkills={item?.projectItemSkills}
                  projectItemTitle={item?.projectItemTitle}
                  key={item?.projectItemTitle}
                />
              ))}

            {showMoreProjects &&
              data?.project?.projectCollection?.items
                .slice(2)
                .map((item: ProjectItemType, index: number) => (
                  <LinkRow
                    projectItemDescription={item?.projectItemDescription}
                    projectItemHyperlink={item?.projectItemHyperlink}
                    projectItemSkills={item?.projectItemSkills}
                    projectItemTitle={item?.projectItemTitle}
                    key={item?.projectItemTitle}
                  />
                ))}
            <div className="text-end my-4">
              <button
                className="hover:text-theme-hover dark:bg-base-300 bg-base-200
            text-sm md:text-base rounded-md p-2 "
                onClick={() => {
                  setShowMoreProjects(!showMoreProjects);
                  showMoreProjects && listRef.current?.scrollIntoView();
                }}
              >
                {showMoreProjects ? "Show Less" : "Show More"}
              </button>
            </div>
          </>
        ) : (
          data?.project?.projectCollection?.items.map(
            (item: ProjectItemType, index: number) => (
              <LinkRow
                projectItemDescription={item?.projectItemDescription}
                projectItemHyperlink={item?.projectItemHyperlink}
                projectItemSkills={item?.projectItemSkills}
                projectItemTitle={item?.projectItemTitle}
                key={item?.projectItemTitle}
              />
            )
          )
        )}
      </motion.ul>
      <div
        className="pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
        ref={revealRef}
      ></div>
    </motion.div>
  );
}
