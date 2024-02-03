"use client";
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useMemo, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Link as LinkIcon, ArrowUpRight } from "@phosphor-icons/react";

export default function ProjectCards() {
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
                <div className="border-b w-fit">
                  <Link href={item?.projectItemHyperlink} target="_blank">
                    <ArrowUpRight className="inline" size={18} />
                    <h5 className="leading-6 p-1 inline">
                      {item.projectItemTitle}
                    </h5>
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

  return <>{projectCards?.map((item: any) => item)}</>;
}
