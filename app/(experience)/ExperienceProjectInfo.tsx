"use client";
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { LinkSimpleHorizontal, GithubLogo } from "@phosphor-icons/react";
import { useBreakpoint } from "@/utils/hooks/useBreakpoint";
import { motion } from "framer-motion";
import { LinkPreview } from "@/components/LinkPreview";
import { Pagination } from "@/components/Pagination";

interface ProjectItemType {
  projectItemDescription: any;
  projectItemHyperlinks: string[];
  projectItemSkills: string[];
  projectItemTitle: string;
  projectItemThumbnail?: { url: string };
}

export default function ExperienceProjectInfo() {
  const query = `query project($id: String!, $skip: Int!, $take: Int!) {
    project(id: $id) {
      projectCollection(limit: $take, skip:$skip,) {
        total
        items {
          ... on ProjectItem {
            projectItemTitle
            projectItemSkills
            projectItemHyperlink
            projectItemHyperlinks 
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
  const { isAboveMd, isBelowMd, md } = useBreakpoint("md");

  const [pagination, setPagination] = useState<{
    skip: number;
    take: number;
    currentPage: number;
  }>({
    skip: 0,
    take: !isBelowMd ? 3 : 2,
    currentPage: 1,
  });

  useEffect(() => {
    setPagination({ ...pagination, take: !isBelowMd ? 3 : 2 });
  }, [isBelowMd]);

  const changePage = (page: number) => {
    setPagination({ ...pagination, skip: (page - 1) * pagination?.take });
  };

  const revealRef = useRef(null);
  const listRef = createRef<HTMLDivElement>();
  const { data, error, isLoading } = useQuery<any>({
    queryKey: ["project", variables?.id, pagination?.skip, pagination?.take],
    queryFn: async () =>
      await request(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
        query,
        {
          id: variables?.id,
          skip: pagination.skip,
          take: pagination.take,
        },
        {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
          "content-type": "application/json",
        }
      ),
  });

  useEffect(() => {
    if (data?.project?.projectCollection?.total) {
      setPagination({
        ...pagination,
        currentPage:
          pagination?.skip === 0
            ? 1
            : Math.floor(
                data?.project?.projectCollection?.total / pagination.skip
              ),
      });
    }
  }, [data?.project?.projectCollection?.total, pagination.skip]);

  const LinkRow = ({
    projectItemDescription,
    projectItemSkills,
    projectItemTitle,
    projectItemHyperlinks,
  }: ProjectItemType) => {
    return (
      <li
        className="grid grid-cols-3 md:grid-cols-12 gap-x-8 border-b-2 py-4 pl-4 group hover:text-theme-hover hover:border-theme-hover
          [grid-template-areas:'title_title_link'_'info_info_info'] 
          md:[grid-template-areas:'title_title_title_title_link_info_info_info_info_info_info_info']"
      >
        <div
          className="text-lg md:text-xl my-auto text-theme group-hover:text-theme-hover
      [grid-area:title]"
        >
          {projectItemTitle}
        </div>
        <div
          className="flex-col gap-2 flex
      [grid-area:info]"
        >
          {documentToReactComponents(projectItemDescription.json)}
          <div className="flex flex-row gap-2 flex-wrap">
            {projectItemSkills?.map((skill: string, index) => (
              <div className="pill" key={`${projectItemTitle}_skill_${index}`}>
                {skill}
              </div>
            ))}
          </div>
        </div>
        <div
          className=" my-auto ml-auto md:ml-0
      [grid-area:link] flex flex-row justify-between gap-4"
        >
          {projectItemHyperlinks &&
            projectItemHyperlinks.map((link, index) =>
              link.includes("github.com") ? (
                <Link href={link} key={index}>
                  <GithubLogo
                    className="inline text-base-400 dark:text-base-100 hover:text-theme-hover"
                    size={18}
                    alt={link}
                  />
                </Link>
              ) : link ? (
                <LinkPreview url={link} key={index}>
                  <LinkSimpleHorizontal
                    className="inline text-base-400 dark:text-base-100 hover:text-theme-hover"
                    size={18}
                    alt={link}
                  />
                </LinkPreview>
              ) : (
                <div className="w-[18px]" />
              )
            )}
        </div>
      </li>
    );
  };

  return (
    <motion.div layout ref={listRef} transition={{ when: "beforeChildren" }}>
      <motion.div
        className="flex flex-col"
        initial={{ opacity: 0, left: -100 }}
        animate={{ opacity: 1, left: 0 }}
        transition={{ staggerChildren: 4, delayChildren: 20 }}
      >
        <ul>
          {data?.project?.projectCollection?.items.map(
            (item: ProjectItemType, index: number) => (
              <LinkRow
                projectItemDescription={item?.projectItemDescription}
                projectItemHyperlinks={item?.projectItemHyperlinks}
                projectItemSkills={item?.projectItemSkills}
                projectItemTitle={item?.projectItemTitle}
                key={item?.projectItemTitle}
              />
            )
          )}
        </ul>
        <div className="my-4">
          {data && (
            <Pagination
              className="flex flex-row justify-end"
              totalCount={data?.project?.projectCollection?.total}
              pagination={pagination}
              setPagination={setPagination}
            />
          )}
        </div>
      </motion.div>
      <div
        className="pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
        ref={revealRef}
      ></div>
    </motion.div>
  );
}
