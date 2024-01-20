"use client";
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useMemo, useState } from "react";
import clsx from "clsx";
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
         cvTitle
         cvDescription{
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
        (item: { cvTitle: string; cvDescription: any }, index: number) => {
          if (index === 0) {
            //set default state if cms data exists
            setExperienceTab(item.cvTitle);
          }
          return (experienceItems[item.cvTitle] = item?.cvDescription.json);
        }
      );
      return experienceItems;
    }
  }, [data]);

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-4 col-start-2">
          {data?.experience?.experienceCollection?.items?.map(
            (item: { cvTitle: string; cvDescription: any }, index: number) => (
              <div
                className={clsx(
                  `block p-4  border-l-2 dark:border-white border-black  hover:text-orange-600 hover:border-orange-600 hover:dark:border-orange-600 cursor-pointer mr-4 hover:transition-colors`,
                  item?.cvTitle === experienceTabState &&
                    "border-b-2 border-b-orange-400 dark:border-b-orange-400 text-orange-400"
                )}
                key={index}
                onClick={() => setExperienceTab(item?.cvTitle)}
              >
                <h4>{item?.cvTitle}</h4>
                {/* <div>{documentToReactComponents(item?.cvDescription.json)}</div> */}
              </div>
            )
          )}
        </div>
        <div className="col-span-7 ml-4">
          {!!experienceDescrptions &&
            experienceTabState &&
            documentToReactComponents(
              experienceDescrptions[experienceTabState]
            )}
        </div>
      </div>
    </>
  );
}
