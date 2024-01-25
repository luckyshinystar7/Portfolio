"use client";
import Link from "next/link";
import { toggleDarkMode } from "../public/scripts/darkMode";
import { Sun, Sunglasses, House } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
const NAVIGATION = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
export default function LayoutHeader({}: {}) {
  const [darkState, setDarkState] = useState<boolean>(false);

  useEffect(() => {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkState(true);
    } else {
      setDarkState(false);
    }
  }, []);

  return (
    <div className="flex flex-row justify-between mt-2 mb-2 z-10">
      {/* <a href="/">Main</a> */}
      <Link
        href="/"
        className="button-hover button-icon my-auto"
      >
        <House size={24} />
      </Link>
      <div className="flex flex-row gap-2 dark:bg-slate-500 bg-slate-200 bg-opacity-65 dark:bg-opacity-65 rounded-md py-2 px-4 text-sm md:text-base">
        {NAVIGATION.map((item, index: number) => (
          <Link
            className="hover:text-blue-400 hover:dark:text-orange-400 leading-6"
            href={item.href}
            key={index}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <button
        className="button-hover button-icon my-auto"
        onClick={() => {
          toggleDarkMode();
          setDarkState(!darkState);
        }}
      >
        {!!darkState ? (
          <Sun className="cursor-pointer" size={24} />
        ) : (
          <Sunglasses className="cursor-pointer" size={24} />
        )}
      </button>
    </div>
  );
}
