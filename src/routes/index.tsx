import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import splash from "../assets/Designer_3.jpeg";

export const Route = createFileRoute("/")({
  component: Index,
});

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 1, duration: 1 } },
  exit: { opacity: 0, transition: { duration: 1 } },
};

function Index() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShow(true);
    }, 0);
    setTimeout(() => {
      setShow(false);
      setShow1(true);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
          >
            <img src={splash} alt="Splash Image" />
          </motion.div>
        )}
      </AnimatePresence>
      {show1 && (
        <motion.div initial="hidden" animate="visible" variants={pageVariants}>
          <div className="p-2 text-4xl font-bold text-center flex flex-col justify-center">
            <div className="text-6xl mx-auto max-w-[1200px] text-blue-700 mt-56 font-recursive text-left">
              We simplify mini-games deployment for game project builders and
              make GameFi really fun for every GameFi community.
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
