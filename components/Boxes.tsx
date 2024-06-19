"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import resolveConfig from "tailwindcss/resolveConfig";
import { Config } from "tailwindcss/types/config";
import tailwindConfig from "@/tailwind.config";

export const BoxesCore = ({
  className,
  darkState,
  ...rest
}: {
  className?: string;
  darkState: boolean;
}) => {
  const rows = new Array(70).fill(1);
  const cols = new Array(50).fill(1);
  const fullConfig = resolveConfig(tailwindConfig as unknown as Config);

  let coolColors = [
    "--blue-300",
    "--blue-400",
    "--blue-500",
    "--blue-600",
    "--violet-300",
    "--violet-400",
    "--violet-500",
    "--violet-600",
  ];

  let warmColors = [
    "--amber-300",
    "--amber-400",
    "--amber-500",
    "--amber-600",
    "--orange-300",
    "--orange-400",
    "--orange-500",
    "--orange-600",
  ];
  const getRandomColor = (colors: string[]) => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform: `translate(-50%,80%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        // "absolute left-1/4 p-4 -top-1/4 flex  -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 ",
        "absolute p-4 bottom-[5%] -left-1/2 flex w-full h-full z-0",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="w-16 h-8  border-l  border-base-200 dark:border-base-300 relative"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `var(${getRandomColor(
                  darkState ? warmColors : coolColors
                )})`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="w-16 h-8  border-r border-t border-base-200 dark:border-base-300 relative"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-base-300 stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
