'use client';

import React, { useEffect } from 'react';
import { useGetNftCreatorsQuery } from '@/store/nftApi';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TopCreators = () => {
  const { data: creators, isLoading, isError } = useGetNftCreatorsQuery();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // This ensures the animation plays only when it first comes into view
    });
    AOS.refresh();
  }, [creators]);

  if (isLoading) {
    return <div className="text-white p-4 text-center">Loading top creators...</div>;
  }

  if (isError || !creators) {
    return <div className="text-red-500 p-4 text-center">Failed to load creators.</div>;
  }

  return (
    <div className="min-h-screen max-container text-white p-4 sm:p-8 lg:p-16 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Top Creators</h1>
            <p className="text-lg sm:text-xl text-[#A2A2A2]">
              Checkout Top Rated Creators On The NFT Marketplace
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {creators.map((creator, index) => (
            <Link href={`/creator/${creator.username}`} key={creator.uuid}>
              <div
                className="bg-[#3B3B3B] p-10 rounded-2xl flex flex-col items-center relative border border-transparent hover:border-[#A259FF] hover:bg-white-800 transition duration-300"
                data-aos="zoom-in"
                data-aos-delay={`${index * 100}`}
              >
                <div className="absolute top-4 left-4 bg-[#2B2B2B] text-[#858584] text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                  {index + 1}
                </div>
                <img
                  src={creator.profileImage}
                  alt={creator.username}
                  className="w-24 h-24 rounded-full mb-4 ring-2 ring-[#A259FF]"
                />
                <h3 className="text-xl font-semibold mb-1">{creator.username}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCreators;