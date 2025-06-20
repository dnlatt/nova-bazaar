'use client';

import React from 'react';
import { useGetNftCreatorsQuery } from '@/store/nftApi'; 
import { NFTsCreator, NFTsCreatorRanking } from '@/types'; 
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Link from 'next/link';

const generateRankingData = (creators: NFTsCreator[]): NFTsCreatorRanking[] => {
  return creators.map((creator) => ({
    ...creator,
    nftsSold: Math.floor(Math.random() * 901) + 100,
    volume: parseFloat((Math.random() * 90 + 10).toFixed(2)),
    change: parseFloat(((Math.random() * 40) - 20).toFixed(2)),
  })).sort((a, b) => b.volume - a.volume);
};

const RankingsPage: React.FC = () => {
  const { data: creators = [], isLoading, isError } = useGetNftCreatorsQuery();

  const creatorsWithRanking = generateRankingData(creators);

  if (isLoading) return <div className="text-white p-8">Loading...</div>;
  if (isError) return <div className="text-red-500 p-8">Failed to load rankings</div>;
  return (
    <main className='max-container'>
        <Header />
        <div className="font-sans">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            {/* Header Section */}
            <div className="mb-10 text-center sm:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2">Top Creators</h1>
              <p className="text-lg sm:text-xl text-[#A2A2A2]">
                Check out top ranking NFT artists on the NFT Marketplace.
              </p>
            </div>

            {/* Rankings Table */}
            <div className="bg-[#2B2B2B] rounded-2xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[auto_1.5fr_1fr_1fr_1fr] /* Adjusted fractional units */
                            py-4 px-6 border-b border-[#858584] text-[#A2A2A2] text-sm sm:text-base font-semibold
                            gap-x-6"> {/* Increased gap-x for spacing between columns */}
                <div className="w-6 text-center">#</div>
                <div>Artist</div>
                <div className="text-right">Change</div>
                <div className="text-right">NFTs Sold</div>
                <div className="text-right">Volume</div>
              </div>

              {/* Table Body */}
              <div>
                {creatorsWithRanking.map((creator, index) => (
                  <Link href={`/creator/${creator.username}`} key={creator.uuid}>
                    <div
                      key={creator.uuid}
                      className="grid grid-cols-[auto_1.5fr_1fr_1fr_1fr] /* Match header grid-cols */
                                items-center py-4 px-6 border-b border-[#3B3B3B] last:border-b-0
                                hover:bg-[#4A4A4A] transition duration-200
                                gap-x-6"> {/* Match header gap-x */}
                      {/* # Column */}
                      <div className="text-[#858584] text-base font-bold w-6 text-center">
                        {index + 1}
                      </div>
                      {/* Artist Column */}
                      <div className="flex items-center gap-3">
                        <img
                          src={creator.profileImage}
                          alt={creator.username}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                        />
                        <span className="text-white text-base sm:text-lg font-semibold truncate">
                          {creator.username}
                        </span>
                      </div>
                      {/* Change Column */}
                      <div className={`text-right text-base font-semibold ${
                        creator.change >= 0 ? 'text-[#00B887]' : 'text-[#FF4A4A]' // Green for positive, Red for negative
                      }`}>
                        {creator.change > 0 ? '+' : ''}{creator.change.toFixed(2)}%
                      </div>
                      {/* NFTs Sold Column */}
                      <div className="text-white text-right text-base font-semibold">
                        {creator.nftsSold}
                      </div>
                      {/* Volume Column */}
                      <div className="text-white text-right text-base font-semibold">
                        {creator.volume.toFixed(2)} ETH
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
    </main>
    
  );
};

export default RankingsPage;