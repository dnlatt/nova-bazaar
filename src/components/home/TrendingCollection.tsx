'use client';

import { FC, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { trendingCollections } from '@/constants';

const TrendingCollection: FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="px-6 py-12 w-full max-container">
      <div className="text-center" data-aos="fade-up">
        <h3 className="font-bold mb-2 text-center">
          Trending Collection
        </h3>
        <h2 className="text-gray-400 mb-6 text-xl text-center">
          Checkout our weekly updated trending collection.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mx-auto">
        {trendingCollections.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-lg flex flex-col justify-center items-center mx-auto"
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <img
              src={item.img}
              alt={item.title}
              className="transition delay-150 duration-300 ease-in-out hover:scale-110 cursor-pointer"
            />
            <h5 className="text-center pt-4">{item.title}</h5>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingCollection;
