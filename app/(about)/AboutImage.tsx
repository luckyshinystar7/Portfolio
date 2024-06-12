"use client";
import { useQuery } from "@tanstack/react-query";
import { request, gql, GraphQLClient } from "graphql-request";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import useInterval from "@/utils/hooks/useInterval";
import { SetStateAction, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ImageContainer } from "@/components/ImageContainer";
import { ImagesSlider } from "@/components/ImageSlider";

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
  const [counter, setCounter] = useState<number>(0);
  const [hover, setHover] = useState<boolean>(false);
  const [images, setImages] = useState<any[]>();
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

  useEffect(() => {
    if (data?.about?.photosCollection?.items?.length > 0) {
      const items: SetStateAction<any[] | undefined> = [];
      data?.about?.photosCollection?.items?.map((item: any) =>
        items.push(item?.url)
      );
      setImages(items);
    }
  }, [data]);

  isLoading && <div>Loading...</div>;
  error && <div>error</div>;

  return (
    images && (
      <div
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        {!hover ? (
          <ImagesSlider
            className="h-[30rem] md:h-[50rem] rounded-md"
            images={images}
          />
        ) : (
          <ImageContainer
            image={data?.about?.hoverPhoto?.url}
            alt="hover image"
            className="h-[30rem] md:h-[50rem] rounded-md"
          />
        )}
      </div>
    )
  );
}
