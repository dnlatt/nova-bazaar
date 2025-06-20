'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useGetNftItemsWithCreatorQuery } from '@/store/nftApi';
import NFTCard from './NFTCard';
import Link from 'next/link';

export default function InfiniteHorizontalTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollX = useMotionValue(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const speed = 0.5;

  const { data: items, isLoading } = useGetNftItemsWithCreatorQuery();

  const visibleItems = useMemo(() => {
    if (!items) return [];
    
    // Shuffle items
    const shuffled = [...items].sort(() => 0.5 - Math.random());

    // Pick first 20
    return shuffled.slice(0, 20);
  }, [items]);

  const duplicated = [...visibleItems, ...visibleItems]; // for infinite loop

  useAnimationFrame(() => {
    if (!wrapperRef.current || isPaused) return;

    const containerWidth = wrapperRef.current.scrollWidth / 2;
    const currentX = scrollX.get();

    scrollX.set(currentX <= -containerWidth ? 0 : currentX - speed);
  });

  if (isLoading) return <p className="text-white p-6">Loading NFTs...</p>;

  return (
    <section className="px-6 py-12">
      <div className="flex justify-between items-center mb-6 max-container mx-auto">
        <h3 className="font-bold mb-2 text-center mx-auto">Discover More NFTs</h3>
        <Link href="/marketplace">
          <button className="border border-purple-500 px-4 py-2 rounded text-purple-400 text-sm cta_button cursor-pointer">
            See All
          </button>
        </Link>
      </div>

      <div className="overflow-hidden w-full">
        <motion.div
          ref={wrapperRef}
          className="flex w-fit"
          style={{ x: scrollX }}
        >
          {duplicated.map((item, i) => (
            <div
              key={`${item.itemId}-${i}`}
              className="mx-2 shrink-0"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <NFTCard item={item} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
