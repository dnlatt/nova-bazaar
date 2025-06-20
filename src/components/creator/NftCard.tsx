// src/components/marketplace/NftCard.tsx
import React from 'react';
import { NFTsItemWithCreator } from '@/types'; // Adjust path if your types file is elsewhere

interface NftCardProps {
  nft: NFTsItemWithCreator;
}

const NftCard: React.FC<NftCardProps> = ({ nft }) => {
  // const displayPrice = nft.price !== undefined ? nft.price.toFixed(2) : '0.53'; // Fallback to 0.53 WETH

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
      <div className="relative w-full aspect-square">
        <img
          src={nft.imageUrl}
          alt={nft.name}
          
          className="rounded-t-xl"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-white mb-1 truncate">
          {nft.name}
        </h3>
        <p className="text-gray-400 text-sm mb-3 truncate">
          {nft.creator?.username || 'Unknown Creator'}
        </p>
        <div className="mt-auto flex justify-between items-center pt-2 border-t border-gray-700">
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">Current Bid</span>
            {/* 
            <span className="text-white text-lg font-bold">
              {displayPrice} WETH
            </span>
            */}
          </div>
          {/* Example for a button, if you want to add "Place Bid" */}
          {/* <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Place Bid
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default NftCard;