"use client";
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import Image from "next/image";
import Link from "next/link";
import { Envelope, InstagramLogo, LinkedinLogo, GithubLogo } from "@phosphor-icons/react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

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

  const renderLogo = (logo: string) => {
    switch (logo) {
      case "Github":
        return <GithubLogo size={24} alt="GitHub Profile"/>;
      case "Linkedin":
        return <LinkedinLogo size={24} alt="Linkedin Profile"/>;
      case "Instagram":
        return <InstagramLogo size={24} alt="Instagram Profile"/>;
      default:
        return <></>;
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 2,
      },
    },
  };

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-row gap-4"
    >
      {data?.contact?.socialCollection?.items?.map(
        (item: any, index: number) => (
          <motion.div key={item?.socialTitle} variants={container}>
            <Link
              href={item?.socialHyperlink}
              target="_blank"
              passHref
              className="hover:text-theme-hover"
            >
              <li className="list-none">{renderLogo(item?.socialTitle)}</li>
            </Link>
          </motion.div>
        )
      )}
    </motion.ul>
  );
}
