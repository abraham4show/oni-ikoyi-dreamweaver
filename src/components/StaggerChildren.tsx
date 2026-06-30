import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}


const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const StaggerChildren = ({ children, className = "", staggerDelay = 0.1 }: StaggerChildrenProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: staggerDelay } },
      }}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div variants={item} className={className}>
    {children}
  </motion.div>
);

export default StaggerChildren;
