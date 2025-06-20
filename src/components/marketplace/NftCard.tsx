// src/components/marketplace/NftCard.tsx
import React from 'react';
import { NFTsItemWithCreator } from '@/types'; // Adjust path if your types file is elsewhere
import Link from 'next/link';

interface NftCardProps {
  nft: NFTsItemWithCreator;
}

const NftCard: React.FC<NftCardProps> = ({ nft }) => {
  

  return (
    <Link href={`/nftitem/${nft.itemId}`} key={nft.itemId}>
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
        <div className="relative w-full aspect-square">
          <img
            src={nft.imageUrl}
            alt={nft.name}
            className="rounded-t-xl ransition delay-150 duration-300 ease-in-out hover:scale-110"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-white mb-1 truncate">
            
            {nft.name}
          </h3>
          <p className="text-gray-400 text-sm mb-3 truncate flex gap-2">
            <img
              src={nft.creator?.profileImage ?? "/images/trending/trending1.png"}
              className="w-6 h-6 rounded-full border"
              alt="creator"
            />
            {nft.creator?.username || 'Unknown Creator'}
          </p>
          
        </div>
      </div>
    </Link>
  );
};

export default NftCard;