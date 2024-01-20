"use client";
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";

export default function ContactInfo() {
  const query = `query contact($id: String!) {
    contact(id: $id) {
     socialCollection(limit:100){
      total
      items{
        ... on Social{
          socialTitle
          socialHyperlink
        }
      }
    }
    }
  }`;
  const variables = {
    id: "4o3VD5QaRA0fKpQHUh8uNc",
  };

  const { data, error, isLoading } = useQuery<any>({
    queryKey: ["contact", variables?.id],
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

  return (
    <>
      {data?.contact?.socialCollection?.items?.map((item: any, index: number) => (
        <a href={item?.socialHyperlink} target="_blank" key={index}>
          {item?.socialTitle}
        </a>
      ))}
    </>
  );
}
