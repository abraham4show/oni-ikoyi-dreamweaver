import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  end: string;
  duration?: number;
}

const CountUp = ({ end, duration = 2000 }: CountUpProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  // Extract numeric part
  const numericMatch = end.match(/(\d+)/);
  const numericEnd = numericMatch ? parseInt(numericMatch[1]) : 0;
  const prefix = end.slice(0, end.indexOf(numericMatch?.[0] || ""));
  const suffix = end.slice((end.indexOf(numericMatch?.[0] || "") || 0) + (numericMatch?.[0]?.length || 0));

  useEffect(() => {
    if (!isInView) return;
    
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericEnd);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, numericEnd, duration, prefix, suffix]);

  return <span ref={ref}>{isInView ? display : `${prefix}0${suffix}`}</span>;
};

export default CountUp;
