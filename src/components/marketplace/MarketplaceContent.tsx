
'use client';
import React, {  useMemo, useState } from 'react';
import NftCard from './NftCard';
import { useGetNftItemsWithCreatorQuery } from '@/store/nftApi';

const ITEMS_PER_PAGE = 12;

const MarketplaceContent: React.FC = () => {
  const { data: allItems = [], isLoading } = useGetNftItemsWithCreatorQuery();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [inputValue, setInputValue] = useState('');

  // Unique categories from the data
  const categories = useMemo(() => {
    const allCategories = allItems.map((item) => item.categoryName);
    return Array.from(new Set(allCategories));
  }, [allItems]);

  // Filtered and searched items
  const filteredItems = useMemo(() => {
    return allItems
      .filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.creator?.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.collectionName?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((item) =>
        selectedCategory ? item.categoryName === selectedCategory : true
      );
  }, [allItems, searchQuery, selectedCategory]);

  // Randomize and paginate
  const paginatedItems = useMemo(() => {
    const shuffled = [...filteredItems].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const handleSearch = () => setSearchQuery(inputValue);

  return (
    <div className="min-h-screen text-white p-5">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Browse Marketplace</h1>
        <p className="text-gray-400 text-lg">
          Browse through more than 50K NFTs on the NFT Marketplace.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        {/* Search Field */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by NFT name, creator, or collection"
            className="w-full pl-4 pr-10 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 border border-gray-700"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            🔍
          </button>
        </div>

        {/* Category Dropdown */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-800 text-white p-4 rounded-lg border border-gray-700 focus:outline-none"
          >
            <option value="">All Categories</option>
            {categories.filter((cat): cat is string => cat != null).map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* NFT Grid */}
      {isLoading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedItems.map((nft) => (
              <NftCard key={nft.itemId} nft={nft} />
            ))}
          </div>

          {/* Load More */}
          {visibleCount < filteredItems.length && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MarketplaceContent;
