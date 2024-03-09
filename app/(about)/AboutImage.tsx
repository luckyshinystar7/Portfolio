"use client";
import { useQuery } from "@tanstack/react-query";
import { request, gql, GraphQLClient } from "graphql-request";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import Image from "next/image";
import useInterval from "@/utils/hooks/useInterval";
import { useState } from "react";

export default function AboutImage() {
  const query = `query about($id: String!) {
    about(id: $id) {
      photosCollection {
        total
        items {
          url
        }
      }
  }
}`;
  const variables = {
    id: "4MXUZL1kYom5Ycxn8RhKBa",
  };

  const [counter, setCounter] = useState<number>(0);
  useInterval(() => {
    if (counter < data?.about?.photosCollection?.items?.length-1) {
      setCounter(counter + 1);
    } else {
      setCounter(0);
    }
  }, 10000);

  const { data, error, isLoading } = useQuery<any>({
    queryKey: ["about", variables?.id],
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

  console.log("data", data, data?.about?.photosCollection?.items[0]?.url);
  isLoading && <div>Loading...</div>;
  error && <div>error</div>;

  return (
    <div className="relative w-full h-full">
      <Image
        alt="bio image"
        src={data?.about?.photosCollection?.items[counter]?.url}
        fill
      />
    </div>
  );
}
