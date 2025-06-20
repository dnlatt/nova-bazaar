'use client';
import { FC, useEffect } from "react"; // Import useEffect
import { useGetNftCategoriesQuery } from "@/store/nftApi";
import { NFTsCategory } from "@/types";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

const BrowseCategories: FC = () => {

  const { data, isLoading, error } = useGetNftCategoriesQuery();

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animation plays only once when element comes into view
    });
    AOS.refresh(); // Recalculate positions after data loads
  }, [data]); // Re-run AOS refresh when category data changes

  if (isLoading) return <p className="px-6 py-12 text-center text-white">Loading categories...</p>; // Added text-white for visibility
  if (error) return <p className="px-6 py-12 text-red-500 text-center">Failed to load categories</p>;

  return (
    <section className="px-6 py-12 max-container text-white"> {/* Added text-white for general text */}
      
      <h4 
        className="font-bold mb-6 text-center text-3xl sm:text-4xl" // Adjusted heading style for consistency
        data-aos="fade-up" // Apply fade-up to the heading
      >
        Browse Categories
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {data?.map((cat: NFTsCategory, index: number) => ( // Added index for staggered delay
          <div 
            key={cat.categoryId} 
            className="p-6 rounded-lg text-center bg-[#3B3B3B] hover:border-[#A259FF] border border-transparent transition duration-300" // Added background, hover, and border styles for consistency
            data-aos="fade-up" // Apply fade-up effect
            data-aos-delay={`${index * 150}`} // Optional: staggered delay
          >
            <div className="w-full flex justify-center items-center rounded mb-4 overflow-hidden">
              <img
                src={cat.categoryImage}
                alt={cat.categoryName}
                className="w-[200px] h-[200px] rounded-2xl object-cover" // Added object-cover to prevent stretching
              />
            </div>
            <div className="text-white capitalize text-xl">{cat.categoryName}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseCategories;