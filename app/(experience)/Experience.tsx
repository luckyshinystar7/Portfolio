"use client";
import { motion } from "framer-motion";
import ExperienceWorkInfo from "./ExperienceWorkInfo";
import ExperienceProjectInfo from "./ExperienceProjectInfo";

export default function Experience() {
  return (
    <section id="experience">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Experience
      </motion.h2>
      <div className="flex flex-col justify-around gap-4">
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Work
          </motion.h3>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <ExperienceWorkInfo />
            {/* <ExperienceInfoTabs/> */}
            {/* <div className="text-end mt-16">
            <Link
              className="hover:text-orange-600 hover:dark:text-orange-400 dark:bg-base-300 bg-base-200 bg-opacity-65 dark:bg-opacity-65 
      text-sm md:text-base rounded-md p-2 
      pointer-events-none opacity-65 dark:opacity-65"
              href="/Portfolio"
            >
              View Full Resume (coming soon)
            </Link>
          </div> */}
          </motion.div>
        </div>
        <div className="mt-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Projects
          </motion.h3>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <ExperienceProjectInfo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
