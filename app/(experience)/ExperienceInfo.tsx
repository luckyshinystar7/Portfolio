"use client";
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useMemo, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Link as LinkIcon, ArrowUpRight } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";
export default function ExperienceInfo() {
  const [experienceTabState, setExperienceTab] = useState<string | undefined>(
    undefined
  );

  const query = `query experience($id: String!) {
    experience(id: $id) {
     experienceCollection(limit:100){
      total
      items{
        ... on CvItem{
         cvItemTitle
         cvItemSkills
         cvItemHyperlink
         cvItemDescription{
            json
         }
        }
      }
    }
    }
  }`;
  const variables = {
    id: "1adSOYfiZPzVqa67S4VLzC",
  };

  const { data, error, isLoading } = useQuery<any>({
    queryKey: ["experience", variables?.id],
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

  const experienceDescrptions = useMemo<{ [x: string]: any }>(() => {
    if (data?.experience?.experienceCollection?.items?.length > 0) {
      let experienceItems = {} as any;
      data?.experience?.experienceCollection?.items.map(
        (
          item: {
            cvItemTitle: string;
            cvItemDescription: any;
            cvItemSkills: any;
            cvItemHyperlink: string;
          },
          index: number
        ) => {
          if (index === 0) {
            //set default state if cms data exists
            setExperienceTab(item.cvItemTitle);
          }
          return (experienceItems[item.cvItemTitle] = {
            title: item?.cvItemTitle,
            skills: item?.cvItemSkills,
            json: item?.cvItemDescription.json,
            link: item?.cvItemHyperlink,
          });
        }
      );
      return experienceItems;
    }
  }, [data]);

  return (
    <>
      <div className="grid grid-cols-12">
        <ul className="col-span-12 md:col-span-4">
          {data?.experience?.experienceCollection?.items?.map(
            (
              item: { cvItemTitle: string; cvItemDescription: any },
              index: number
            ) => (
              <li
                className={twMerge(
                  clsx(
                    `transition-colors ease-out block p-4 border-l-2 hover:border-theme-hover hover:text-theme-hover cursor-pointer mr-4`,
                    item?.cvItemTitle === experienceTabState
                      ? "border-b-2 border-theme text-theme"
                      : "dark:border-base-100 border-base-400"
                  )
                )}
                key={index}
                onClick={() => setExperienceTab(item?.cvItemTitle)}
              >
                <h5>{item?.cvItemTitle}</h5>
                {/* <div>{documentToReactComponents(item?.cvItemDescription.json)}</div> */}
              </li>
            )
          )}
        </ul>
        <div
          className="col-span-12 md:col-span-8 md:ml-4 mt-4 text-sm md:text-base"
          // max-h-[280px] md:max-h-[184px]"
        >
          {!!experienceDescrptions &&
            experienceTabState &&
            documentToReactComponents(
              experienceDescrptions[experienceTabState].json,
              {
                renderMark: {
                  [MARKS.ITALIC]: (text) => (
                    <div className="dark:text-base-100 text-base-400 italic text-sm flex flex-row justify-between">
                      {text}
                      <div className="border-b w-fit">
                        <Link
                          href={experienceDescrptions[experienceTabState]?.link}
                          target="_blank"
                        >
                          <ArrowUpRight className="inline" size={16} />
                          {/* {experienceDescrptions[experienceTabState]?.title} */}
                        </Link>
                      </div>
                    </div>
                  ),
                },
                renderNode: {
                  [BLOCKS.LIST_ITEM]: (node, children) => {
                    return (
                      <li className="list-disc list-inside">
                        {/* @ts-ignore-error */}
                        {node?.content[0]?.content[0]?.value}
                      </li>
                    );
                  },
                  [BLOCKS.PARAGRAPH]: (node, children) => {
                    return (
                      <p className="text-theme text-justify">{children}</p>
                    );
                  },
                },
              }
            )}

          {!!experienceDescrptions && experienceTabState && (
            <div className="flex flex-row gap-2 flex-wrap mt-2">
              {experienceDescrptions[experienceTabState].skills?.map(
                (skill: string, index: number) => (
                  <div
                    key={`experience_skill_${index}`}
                    className="col-span-1 pill"
                  >
                    {skill}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
