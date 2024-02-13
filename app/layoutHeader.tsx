"use client";
import Link from "next/link";
import { toggleDarkMode } from "../public/scripts/darkMode";
import { Sun, Sunglasses, House, List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { useBreakpoint } from "@/utils/hooks/useBreakpoint";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion, useScroll } from "framer-motion";

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

  const { scrollYProgress } = useScroll();

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
      <motion.div
        // className={`h-1 w-full bg-red-50 scale-x-[${scrollYProgress}]`}
        className={`h-2 w-full bg-primary-100 dark:bg-secondary-100 fixed top-0 left-0 right-0`}
        style={{ scaleX: scrollYProgress }}
      />
      <motion.div
        className="z-10 sticky top-2 breakpoint-x"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="flex flex-row justify-end drop-shadow-md">
          {/* #TODO: maybe make a useClient context thing if more window undefineds are required */}
          {window !== undefined && isBelowMd ? (
            <button
              className="dark:bg-base-100 dark:text-base-400 bg-base-300 bg-opacity-90 dark:bg-opacity-90 text-base-100 rounded-md px-4 py-2 flex flex-row "
              onClick={() => setNavOpen(true)}
            >
              <List size={24} />
            </button>
          ) : (
            <nav className="justify-evenly items-center flex flex-row gap-4 dark:bg-base-100  dark:text-base-400 bg-base-300 bg-opacity-90 dark:bg-opacity-90 text-base-100 rounded-md px-4 py-2 text-sm md:text-base">
              {NAVIGATION.map((item, index: number) =>
                item.href === "#contact" ? (
                  <Link
                    className="hover:drop-shadow-md text-base-100 hover:text-base-100  bg-primary-100 dark:bg-secondary-100 leading-6 rounded-md bg-opacity-80"
                    href={item.href}
                    key={index}
                  >
                    <div className="flex flex-row gap-1 items-center pt-2 pb-0 px-2">
                      <ArrowUpRight size={18} className="inline" />
                      {item.label}
                    </div>
                    <motion.div className="w-full h-2 bg-primary-200 dark:bg-secondary-200 relative bottom-0 left-0 right-0 rounded-b-md" />
                  </Link>
                ) : (
                  <Link
                    className="hover:text-theme leading-6"
                    href={item.href}
                    key={index}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          )}
        </div>
      </motion.div>
      <AnimatePresence mode="wait">
        {navOpen && (
          <Modal>
            <motion.div
              className="bg-base-300 dark:bg-base-100 text-base-100 dark:text-base-400 h-full text-end py-4 breakpoint-x px-8"
              initial={{ width: 0, right: 0 }}
              animate={{ width: "100%", right: 0 }}
              exit={{ width: 0, right: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button onClick={() => setNavOpen(false)}>
                <X size={24} />
              </button>
              <motion.nav
                className="flex flex-col gap-4 items-end mt-4 mr-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {NAVIGATION.map((item, index: number) =>
                  item.href === "#contact" ? (
                    <Link
                      className="hover:drop-shadow-md hover:text-base-100 hover:dark:text-base-100 hover:bg-primary-100  hover:dark:bg-secondary-100 leading-6 border-theme border-2 p-2 rounded-md
                  flex flex-row gap-1 items-center"
                      href={item.href}
                      key={index}
                      onClick={() => setNavOpen(false)}
                    >
                      <ArrowUpRight size={18} className="inline" />
                      {item.label}
                    </Link>
                  ) : (
                    <Link
                      className="hover:text-theme leading-6"
                      href={item.href}
                      key={index}
                      onClick={() => setNavOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </motion.nav>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
