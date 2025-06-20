import React, { useRef, useState, useEffect } from "react";
import {
    motion,
    useSpring,
    useTransform,
    useMotionTemplate,
    animate,
    useReducedMotion,
    MotionValue,
    AnimationPlaybackControls
  } from "framer-motion";

import { NFTsItem} from '@/types'; // Assuming '@/types' correctly defines NFTsItem


interface ItemTiltProps {
  nft: NFTsItem;
  autoTilt?: boolean;
  autoTiltSpeed?: number;
  maxTiltAngle?: number;
}

const ItemTilt: React.FC<ItemTiltProps> = ({
  nft,
  autoTilt = true,
  autoTiltSpeed = 0.5,
  maxTiltAngle = 10,
}) => {
  const cardRef = useRef<HTMLImageElement>(null);

  const mouseX = useSpring(0, { stiffness: 500, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 30 });

  const prefersReducedMotion = useReducedMotion();

  const [isHovered, setIsHovered] = useState(false);

  const autoRotateX: MotionValue<number> = useSpring(0);
  const autoRotateY: MotionValue<number> = useSpring(0);

  const rotateX = useTransform(mouseY, (newMouseY) => {
    if (!cardRef.current) return 0;
    const rect = cardRef.current.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const offset = newMouseY - center;
    return (offset / (rect.height / 2)) * -maxTiltAngle;
  });

  const rotateY = useTransform(mouseX, (newMouseX) => {
    if (!cardRef.current) return 0;
    const rect = cardRef.current.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const offset = newMouseX - center;
    return (offset / (rect.width / 2)) * maxTiltAngle;
  });

  const combinedRotateX = useTransform(
    [rotateX, autoRotateX],
    ([mouseRotX, autoRotX]) => (isHovered ? mouseRotX : autoRotX)
  );

  const combinedRotateY = useTransform(
    [rotateY, autoRotateY],
    ([mouseRotY, autoRotY]) => (isHovered ? mouseRotY : autoRotY)
  );

  const cardTransform = useMotionTemplate`perspective(1000px) rotateX(${combinedRotateX}deg) rotateY(${combinedRotateY}deg)`;

  // Auto-tilt effect
  useEffect(() => {
    if (prefersReducedMotion || !autoTilt) return;

    let animationX: AnimationPlaybackControls | undefined;
    let animationY: AnimationPlaybackControls | undefined;

    // Calculate the duration for one full back-and-forth cycle (e.g., -max to +max and back to -max)
    const tiltCycleDuration = 1 / autoTiltSpeed * 2;
    // For a circular/elliptical motion, we introduce a phase delay of a quarter of the cycle
    const phaseDelay = tiltCycleDuration / 4;

    const startAutoTilt = () => {
      // Animate autoRotateX back and forth
      animationX = animate(autoRotateX, [-maxTiltAngle, maxTiltAngle], {
        duration: tiltCycleDuration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      });

      // Animate autoRotateY back and forth, but with a phase delay
      // This creates the perception of circular/elliptical movement
      animationY = animate(autoRotateY, [-maxTiltAngle, maxTiltAngle], { // Animate in the same range for symmetry
        duration: tiltCycleDuration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
        delay: phaseDelay, // Key change: introduces the phase shift
      });
    };

    const stopAutoTilt = () => {
      if (animationX) animationX.stop();
      if (animationY) animationY.stop();
      autoRotateX.set(0);
      autoRotateY.set(0);
    };

    if (!isHovered) {
      startAutoTilt();
    }

    return () => {
      stopAutoTilt();
    };
  }, [prefersReducedMotion, autoTilt, isHovered, autoRotateX, autoRotateY, maxTiltAngle, autoTiltSpeed]);


  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (prefersReducedMotion) return;

    setIsHovered(true);
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;

    setIsHovered(false);
    // Smoothly reset mouse-controlled rotations to center
    mouseX.set(cardRef.current ? cardRef.current.getBoundingClientRect().left + cardRef.current.getBoundingClientRect().width / 2 : 0);
    mouseY.set(cardRef.current ? cardRef.current.getBoundingClientRect().top + cardRef.current.getBoundingClientRect().height / 2 : 0);
  };

  return (
    <div className="w-full lg:w-1/2">
      <motion.img
        ref={cardRef}
        src={nft.imageUrl}
        alt={nft.name}
        className="w-full h-auto max-h-[600px] object-cover rounded-2xl"
        style={{
          transform: cardTransform,
          transition: prefersReducedMotion ? 'none' : 'transform 0.1s ease-out'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default ItemTilt;