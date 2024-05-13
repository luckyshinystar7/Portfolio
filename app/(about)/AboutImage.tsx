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
import { AnimatePresence, motion, useScroll } from "framer-motion";

export default function AboutImage() {
  const query = `query about($id: String!) {
    about(id: $id) {
      biography {
        json
      }
      hoverPhoto{
        url
      }
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
  } as const;

  const MotionImage = motion(Image);
  const [counter, setCounter] = useState<number>(0);
  const [hover, setHover] = useState<boolean>(false);

  useInterval(() => {
    if (counter < data?.about?.photosCollection?.items?.length - 1) {
      setCounter(counter + 1);
    } else {
      setCounter(0);
    }
  }, 7000);

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

  console.log("data", data?.about);
  isLoading && <div>Loading...</div>;
  error && <div>error</div>;

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <MotionImage
          alt="bio image"
          src={
            !hover
              ? data?.about?.photosCollection?.items[counter]?.url
              : data?.about?.hoverPhoto?.url
          }
          fill
          initial={{ y: !hover ? -700 : 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: !hover ? 700 : 0, opacity: 0 }}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        />
      </AnimatePresence>
    </div>
  );
}
