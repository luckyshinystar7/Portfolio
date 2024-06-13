"use client";
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useMemo, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import {
  Link as LinkIcon,
  ArrowUpRight,
  LinkSimpleHorizontal,
} from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { LinkPreview } from "@/components/LinkPreview";
import { Tabs } from "@/components/Tabs";

export default function ExperienceInfoTabs() {
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

  const tabs = useMemo<any[]>(() => {
    if (data?.experience?.experienceCollection?.items?.length > 0) {
      let experienceItems = [] as any;
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
          experienceItems.push({
            // title: item?.cvItemTitle,
            // skills: item?.cvItemSkills,
            // json: item?.cvItemDescription.json,
            // link: item?.cvItemHyperlink,
            title: item?.cvItemTitle,
            value: item?.cvItemTitle,
            content: (
              <div className="bg-neutral-200 dark:bg-neutral-300 rounded-md p-4">
                {documentToReactComponents(item?.cvItemDescription.json, {
                  renderMark: {
                    [MARKS.ITALIC]: (text) => (
                      <div className="dark:text-base-400 text-base-400 italic text-sm flex flex-row-reverse md:flex-row justify-between mb-2 ">
                        <div className="border-b hover:border-theme-hover dark:border-b-base-400 border-b-base-400 w-fit">
                          <LinkPreview url={item?.cvItemHyperlink}>
                            <LinkSimpleHorizontal
                              className="inline hover:text-theme-hover dark:text-base-400 text-base-400"
                              size={18}
                              alt={item?.cvItemHyperlink}
                            />
                          </LinkPreview>
                        </div>
                        <div>{text}</div>
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
                        <div className="dark:text-base-400 text-base-400 text-justify">
                          {children}
                        </div>
                      );
                    },
                  },
                })}
                <div className="flex flex-row gap-2 flex-wrap mt-2">
                  {item?.cvItemSkills.map((skill: string, index: number) => (
                    <div
                      key={`experience_skill_${index}`}
                      className="col-span-1 pill"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ),
          });
        }
      );
      return experienceItems;
    }
  }, [data]);

  return (
    <>
      {data && (
        <Tabs
          tabs={tabs}
          tabClassName="bg-neutral-100 dark:bg-neutral-400 border-l-2 border-b-2 w-full hover:text-theme rounded-none cursor-pointer mr-4"
          activeTabClassName="border-l-2 border-b-2 border-theme-hover bg-neutral-200 dark:bg-neutral-300"
          containerClassName="text-lg md:text-xl mb-8 md:mb-0"
        />
      )}
    </>
  );
}
