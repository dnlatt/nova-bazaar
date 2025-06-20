'use client';

import { useGetNftItemsWithCreatorQuery } from '@/store/nftApi';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ItemTilt from './ItemTilt';
import Link from 'next/link';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';



interface NftDetailsPageProps {
  itemID: string;
}

const NftDetailsPage = ({ itemID }: NftDetailsPageProps) => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const { data: items = [], isLoading } = useGetNftItemsWithCreatorQuery();

  const nft = items.find((item) => item.itemId === itemID);

  if (isLoading) return <div className="text-white p-8">Loading...</div>;
  if (!nft) return <div className="text-white p-8">NFT not found</div>;

  const moreFromArtist = items.filter(
    (item) => item.creator?.username === nft.creator?.username && item.itemId !== nft.itemId
  );

  return (
    <main className="font-sans">
      <Header />
      <div className="min-h-screen bg-[#3B3B3B] text-white font-sans">
        

        <div className="max-container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row lg:gap-12 items-start">
            {/* Left Column: NFT Details */}
            <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl font-bold mb-4">{nft.name}</h1>
              <div className="flex items-center gap-2 mb-6">
                  <img
                      src={nft.creator?.profileImage}
                      alt={nft.creator?.username}
                      className="w-40 h-40 stroke-amber-50 stroke-5 rounded-full"
                    />
                    
                <span className="text-gray-300">Crafted by </span>
                <span className="text-white font-semibold">{nft.creator?.username}</span>
              </div>

              <p className="text-white mb-6 whitespace-pre-line">{nft.description}</p>

              <div className="flex flex-wrap gap-2 mb-10">
                {nft.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[#2B2B2B] px-4 py-2 rounded-2xl text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: NFT Image */}
            <ItemTilt
              nft={nft}
              autoTilt={true} // Enable auto-tilt
              autoTiltSpeed={0.7} // Faster auto-tilt
              maxTiltAngle={10} // More pronounced tilt
            />
          </div>

          {/* More From This Artist */}
          <h2 className="text-3xl font-bold mb-6 pt-12">More From This Artist</h2>
            {moreFromArtist.length === 0 ? (
              <div className="text-center text-white text-lg bg-[#2B2B2B] p-6 rounded-xl">
                There is no NFT items by this Artist.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {moreFromArtist.map((item, index) => (
                  <Link href={`/nftitem/${item.itemId}`} key={item.itemId}>
                    <div
                      className="bg-[#3B3B3B] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <div className="relative w-full h-auto aspect-w-1 aspect-h-1">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-t-2xl transition delay-150 duration-300 ease-in-out hover:scale-110"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                        <div className="flex items-center gap-2 mb-4">
                          <img
                            src={item.creator?.profileImage}
                            alt={item.creator?.username}
                            className="w-6 h-6 rounded-full object-cover transition delay-150 duration-300 ease-in-out hover:scale-110"
                          />
                          <span className="text-[#A2A2A2]">{item.creator?.username}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

        </div>
      </div>
      <Footer />
    </main>
  );
};

export default NftDetailsPage;
