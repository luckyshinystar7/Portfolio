"use client";
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import Image from "next/image";
import Link from "next/link";
import { InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";
export default function ContactInfo() {
  const query = `query contact($id: String!) {
    contact(id: $id) {
     socialCollection(limit:100){
      total
      items{
        ... on Social{
          socialTitle
          socialHyperlink
          image{
           url 
          }
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

  console.log("social data", data);
  const renderLogo = (logo: string) => {
    switch (logo) {
      case "Linkedin":
        return <LinkedinLogo size={24} />;
      case "Instagram":
        return <InstagramLogo size={24} />;
      default:
        return <></>;
    }
  };

  return (
    <>
      {data?.contact?.socialCollection?.items?.map(
        (item: any, index: number) => (
          <Link
            href={item?.socialHyperlink}
            target="_blank"
            key={index}
            passHref
          >
            {renderLogo(item?.socialTitle)}
          </Link>
        )
      )}
    </>
  );
}
