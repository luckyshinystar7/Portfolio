"use client";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const ImageContainer = ({
  image,
  children,
  overlay = false,
  overlayClassName,
  className,
  alt,
}: {
  image: string;
  alt: string;
  children?: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
      style={{
        perspective: "1000px",
      }}
    >
      {children}
      {overlay && (
        <div
          className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)}
        />
      )}

      <Image
        src={image}
        alt={alt}
        fill
        className="image h-full w-full absolute inset-0 object-cover object-center"
      />
    </div>
  );
};
