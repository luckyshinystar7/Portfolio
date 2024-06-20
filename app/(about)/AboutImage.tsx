"use client";
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { SetStateAction, useEffect, useState } from "react";
import { ImagesSlider } from "@/components/ImageSlider";
import Image from "next/image";
import { CardBody, CardContainer } from "@/components/CardBody";

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
  const [images, setImages] = useState<any[]>();

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
    <CardContainer containerClassName="py-0 justify-end">
      <CardBody className="h-full">
        {images && (
          <ImagesSlider
            className="h-[30rem] md:h-[50rem] rounded-md group transition-all"
            images={images}
          >
            <div className="invisible group-hover:visible z-10">
              <Image
                src={data?.about?.hoverPhoto?.url}
                alt="hover image"
                fill
                className="image h-full w-full absolute inset-0 object-cover object-center"
              />
            </div>
          </ImagesSlider>
        )}
      </CardBody>
    </CardContainer>
  );
}
