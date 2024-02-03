"use client";
import Link from "next/link";
import { toggleDarkMode } from "../public/scripts/darkMode";
import { Sun, Sunglasses, House, List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { useBreakpoint } from "@/utils/hooks/useBreakpoint";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
const NAVIGATION = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  // { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
export default function LayoutHeader({}: {}) {
  const [darkState, setDarkState] = useState<boolean>(false);
  const [navOpen, setNavOpen] = useState<boolean>(false);

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

  const { isAboveMd, isBelowMd, md } = useBreakpoint("md");

  return (
    <>
      <div className="z-10 sticky top-2 px-8 md:px-12 my-2 max-w-[1440px] w-full mx-auto flex flex-row justify-end">
        <div className="md:min-w-[20rem] md:justify-evenly items-center flex flex-row gap-4 dark:bg-off-white  dark:text-black bg-slate-500 bg-opacity-90 dark:bg-opacity-90 text-off-white rounded-md py-2 px-4 text-sm md:text-base">
          {isBelowMd ? (
            <button onClick={() => setNavOpen(true)}>
              <List size={24} />
            </button>
          ) : (
            NAVIGATION.map((item, index: number) =>
              item.href === "#contact" ? (
                <Link
                  className="hover:text-off-white hover:dark:text-off-white hover:bg-blue-400  hover:dark:bg-orange-400 leading-6 border-blue-400 dark:border-orange-400 border-2 p-2 rounded-md"
                  href={item.href}
                  key={index}
                >
                  {item.label} <ArrowUpRight size={18} className="inline" />
                </Link>
              ) : (
                <Link
                  className="hover:text-blue-400 hover:dark:text-orange-400 leading-6"
                  href={item.href}
                  key={index}
                >
                  {item.label}
                </Link>
              )
            )
          )}
        </div>
      </div>
      {navOpen && (
        <Modal>
          <div className="bg-slate-500 dark:bg-off-white text-off-white dark:text-black flex flex-col pt-4 px-12 w-full h-full items-end">
            <button onClick={() => setNavOpen(false)}>
              <X size={24} />
            </button>
            {NAVIGATION.map((item, index: number) => (
              <Link
                className="hover:text-blue-400 hover:dark:text-orange-400 leading-6"
                href={item.href}
                key={index}
                onClick={() => setNavOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
}
