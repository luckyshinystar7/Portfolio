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

export default function ExperienceWorkInfo() {
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
        <motion.ul
          className="col-span-12 md:col-span-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 1 }}
        >
          {data?.experience?.experienceCollection?.items?.map(
            (
              item: { cvItemTitle: string; cvItemDescription: any },
              index: number
            ) => (
              <li
                key={`${item?.cvItemTitle}}`}
                className={twMerge(
                  clsx(
                    `transition-colors ease-out  block  border-l-2 hover:border-theme-hover hover:text-theme cursor-pointer mr-4`,
                    item?.cvItemTitle === experienceTabState
                      ? "border-theme text-theme-hover pointer-events-none"
                      : "dark:border-base-100 border-base-400"
                  )
                )}
              >
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 1, delayChildren: 1 }}
                  onClick={() => setExperienceTab(item?.cvItemTitle)}
                  className="w-full h-full text-start p-4 md:py-6"
                >
                  <div className="text-lg md:text-xl">{item?.cvItemTitle}</div>
                  {/* <div>{documentToReactComponents(item?.cvItemDescription.json)}</div> */}
                </motion.button>
                {item?.cvItemTitle === experienceTabState && (
                  <motion.div
                    layoutId="experience_divider"
                    className="w-full h-2 bg-primary-200 dark:bg-secondary-200 relative left-0 right-0"
                  />
                )}
              </li>
            )
          )}
        </motion.ul>

        <div className="col-span-12 md:col-span-8 md:ml-4 mt-4 text-sm md:text-base overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${experienceTabState}_content`}
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 200, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {!!experienceDescrptions &&
                experienceTabState &&
                documentToReactComponents(
                  experienceDescrptions[experienceTabState].json,
                  {
                    renderMark: {
                      [MARKS.ITALIC]: (text) => (
                        <div className="dark:text-base-100 text-base-400 italic text-sm flex flex-row-reverse md:flex-row justify-between mb-2 ">
                          <div>
                            <LinkPreview
                              url={
                                experienceDescrptions[experienceTabState]?.link
                              }
                            >
                              <LinkSimpleHorizontal
                                className="inline hover:text-theme-hover"
                                size={18}
                                alt={
                                  experienceDescrptions[experienceTabState]
                                    ?.link
                                }
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
                          <div className="text-theme text-justify">
                            {children}
                          </div>
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
