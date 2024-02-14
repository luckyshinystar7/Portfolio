"use client";
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import Image from "next/image";
import Link from "next/link";
import { Envelope, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

export default function Email() {
  const query = `query email($id: String!) {
    email(id: $id) {
        email
      }
  }`;
  const variables = {
    id: "42QKmqFjKN9M4lcKIfbann",
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

  return { email: data?.email?.email };
}
