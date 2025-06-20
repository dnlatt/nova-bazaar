// components/AnimatedNumber.tsx
"use client"; // This component uses client-side hooks like useState and useEffect

import React, { useState, useRef, useEffect } from "react";
import { animate, useInView } from "framer-motion";
import type { Easing } from "framer-motion"; // Import Easing type for better type safety

interface AnimatedNumberProps {
  start?: number; // Starting number for the animation
  end: number; // Ending number for the animation
  duration?: number; // Duration in seconds for the animation
  ease?: "anticipate" | "backIn" | "backOut" | "backInOut" | "circIn" | "circOut" | "circInOut" | "easeIn" | "easeOut" | "easeInOut" | Easing; // Easing type
  repeat?: boolean; // If true, animation occurs more than once
  addCommas?: boolean; // Whether to add commas to the number
  className?: string; // Tailwind CSS classes for the text
}

// Helper function to add commas to a number string
function addCommasToNumber(numberString: string): string {
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  start = 0, // Default starting number to 0
  end,
  duration = 2, // Default duration to 2 seconds if not provided
  ease = "easeOut", // Default easing to 'easeOut'
  repeat = false, // Default repeat to false
  addCommas = false, // Default addCommas to false
  className = "", // Default empty string for className
}) => {
  const ref = useRef<HTMLDivElement>(null); // Ref for the div wrapping the number
  const isInView = useInView(ref, { once: !repeat }); // Animation occurs once if repeat is false
  const [displayNumber, setDisplayNumber] = useState(addCommas ? addCommasToNumber(start.toString()) : start.toString());

  useEffect(() => {
    if (isInView) {
      const controls = animate(start, end, {
        duration,
        ease,
        onUpdate: (latestValue) => {
          const valueToInteger = parseInt(latestValue.toString()); // Convert to integer
          let formattedValue = valueToInteger.toString();
          if (addCommas) {
            formattedValue = addCommasToNumber(formattedValue); // Add commas if requested
          }
          setDisplayNumber(formattedValue);
        },
        onComplete: () => {
            // Optional: If you want to ensure the final value is exactly 'end' without
            // any floating point artifacts from `parseInt(val.toString())`
            if (addCommas) {
                setDisplayNumber(addCommasToNumber(end.toString()));
            } else {
                setDisplayNumber(end.toString());
            }
        }
      });

      // Cleanup function for Framer Motion animation
      return () => controls.stop();
    }
  }, [isInView, start, end, duration, ease, addCommas, repeat]); // Dependencies for useEffect

  return (
    <div ref={ref} className={className}>
      {displayNumber}
    </div>
  );
};

export default AnimatedNumber;