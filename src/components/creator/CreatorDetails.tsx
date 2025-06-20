'use client';

import React, { useEffect } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { CreatorDetailsProps } from '@/types';
import { useGetNftCreatorsQuery, useGetNftItemsWithCreatorQuery } from '@/store/nftApi';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CreatorDetails: React.FC<CreatorDetailsProps> = ({ username }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const { data: creators = [], isLoading: isLoadingCreators } = useGetNftCreatorsQuery();
  const { data: items = [], isLoading: isLoadingItems } = useGetNftItemsWithCreatorQuery();

  const artist = creators.find((creator) => creator.username === username);
  const artistItems = items.filter((item) => item.creatorId === artist?.uuid);

  if (isLoadingCreators || isLoadingItems) return <div className="text-white p-8">Loading...</div>;
  if (!artist) return <div className="text-white p-8">Artist not found</div>;

  return (
    <main className="font-sans">
      <Header />

      <div className="text-white">
        {/* Banner */}
        <div className="relative w-full h-[380px] overflow-hidden">
          <img
            src={artist.bgImage}
            alt="Artist Banner"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Profile */}
        <div className="max-container mx-auto px-4 sm:px-6 lg:px-8 -mt-[120px] relative z-10">
          <div className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] lg:w-[200px] lg:h-[200px] rounded-full ring-4 ring-[#3B3B3B] overflow-hidden">
            <img src={artist.profileImage} alt={artist.username} width={200} height={200} className="w-full h-full" />
          </div>

          <div className="flex flex-col md:flex-row md:justify-between mt-8">
            <h1 className="text-4xl font-bold">{artist.username}</h1>
          </div>

          {/* Bio */}
          <div className="mt-6 mb-8">
            <h5 className="text-[#A2A2A2] font-bold mb-2">Bio</h5>
            <p className="text-white text-lg">{artist.bio}</p>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="bg-[#3B3B3B] border-t border-[#858584] mt-8">
          <div className="max-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h4 className="font-bold mb-2 text-center pb-2">Crafted by this Creator</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artistItems.length === 0 ? (
                <div className="text-center col-span-full text-white text-lg bg-[#2B2B2B] p-6 rounded-xl">
                  There is no NFT items by this Artist.
                </div>
              ) : (
                artistItems.map((item, index) => (
                  <Link href={`/nftitem/${item.itemId}`} key={item.itemId}>
                    <div
                      className="bg-[#2B2B2B] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <img src={item.imageUrl} alt={item.name} width={330} height={330} className="w-full transition delay-150 duration-300 ease-in-out hover:scale-110 cursor-pointer" />
                      <div className="p-5">
                        <h4 className="text-xl font-semibold mb-2">{item.name}</h4>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default CreatorDetails;
