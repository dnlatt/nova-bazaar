// components/NFTCard.tsx
import React from "react";
import { NFTsItemWithCreator } from "@/types";
import Link from "next/link";

interface NFTCardProps {
  item: NFTsItemWithCreator;
}

const NFTCard: React.FC<NFTCardProps> = ({ item }) => {
  return (
    <Link href={`/nftitem/${item.itemId}`} key={item.itemId}>
      <div className="bg-[#2B2B2B] rounded-xl overflow-hidden w-full max-w-xs">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-[420px] h-[296px] object-cover transition delay-150 duration-300 ease-in-out hover:scale-110"
        />
        <div className="p-4 space-y-2">
          <h3 className="text-white font-semibold text-lg">{item.name}</h3>
          <div className="flex items-center gap-2 text-sm text-white">
            <img
              src={item.creator?.profileImage ?? "/images/trending/trending1.png"}
              className="w-6 h-6 rounded-full border"
              alt="creator"
            />
            <span className="text-gray-300">{item.creator?.username ?? "Unknown"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
