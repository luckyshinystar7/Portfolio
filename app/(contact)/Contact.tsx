"use client";
import Link from "next/link";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Typewriter } from "@/components/Typewriter";
import { Button } from "@/components/MovingBorder";
import ContactInfo from "./ContactInfo";
import Email from "./Email";
import { Boxes } from "@/components/Boxes";

export default function Contact() {
  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <section id="contact" className="flex flex-col" ref={contactRef}>
      <motion.h4
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true, amount: 0.5 }}
        className="z-20 bg-base-100 dark:bg-base-400 w-fit bg-opacity-80 dark:bg-opacity-80"
      >
        Let&apos;s Connect!
      </motion.h4>
      <Typewriter
        className="text-left text-2xl md:text-3xl flex items-start font-bold z-20 bg-base-100 dark:bg-base-400 w-fit bg-opacity-80 dark:bg-opacity-80"
        words={[
          { text: "Reach" },
          { text: "out" },
          { text: "to" },
          { text: "me" },
          { text: "at:" },
        ]}
      />

      <motion.div className="grow flex flex-col">
        <Link
          href={`mailto:${Email().email}`}
          className="w-fit ml-auto self-end mt-auto mb-32 z-20 "
          passHref
        >
          <Button className="bg-base-100 dark:bg-base-400 rounded-md text-theme hover:anchor-hover hover:text-theme-hover bg-opacity-80 dark:bg-opacity-80">
            <div className="p-2 flex items-center">
              <EnvelopeSimple size={32} className="inline p-1" />
              <h3 className="inline mb-0 ">{Email().email}</h3>
            </div>
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        dragConstraints={contactRef}
        dragMomentum={false}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true, amount: 0.5 }}
        drag
        className="bg-base-200 dark:bg-base-300 p-2 w-fit rounded-md cursor-move z-20 bg-opacity-80 dark:bg-opacity-80"
      >
        <ContactInfo />
      </motion.div>

      <motion.div
        drag
        dragConstraints={contactRef}
        className="cursor-move hidden md:block"
      >
        <Boxes darkState={true} />
      </motion.div>
    </section>
  );
}
