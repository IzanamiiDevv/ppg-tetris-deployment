import { createFileRoute } from "@tanstack/react-router";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
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

const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.5, 0.5, 1],
    },
  },
};

function CursorBlinker() {
  return (
    <motion.div
      variants={cursorVariants}
      animate="blinking"
      className="inline-block h-12 w-[1px] translate-y-1 bg-slate-900"
    />
  );
}

function TextAnim() {
  const baseText =
    "We simplify mini-games deployment for game project builders and make GameFi really fun for every GameFi community.";
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween",
      duration: 20,
      ease: "easeInOut",
    });
    return controls.stop;
  }, []);

  return (
    <span className="">
      <motion.span>{displayText}</motion.span>
      <CursorBlinker />
    </span>
  );
}

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
    setTimeout(() => {
      setShow(true);
      setShow1(false);
    }, 25000);

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
            <img
              src={splash}
              alt="Splash Image"
              className="w-[100%] max-w-[1400px] mx-auto"
            />
          </motion.div>
        )}
      </AnimatePresence>
      {show1 && (
        <motion.div initial="hidden" animate="visible" variants={pageVariants}>
          <div className="p-2 text-4xl font-bold text-center flex flex-col justify-center">
            <div className="text-6xl mx-auto max-w-[1200px] text-blue-700 mt-56 font-recursive text-left">
              <TextAnim />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
