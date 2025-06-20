'use client';

import { FC, useEffect } from 'react';
import { Mail } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const JoinOurWeeklyDigest: FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="flex flex-col md:flex-row justify-between items-center p-10 gap-8 w-full max-container">
      <div
        className="w-full md:w-1/2"
        id="join-image"
        data-aos="fade-left"
      >
        <img
          src="/images/home/newsletter.png"
          alt="Newsletter"
          className="rounded-xl w-[400px] h-auto object-cover"
        />
      </div>

      <div
        className="w-full md:w-1/2"
        id="join-form"
        data-aos="fade-right"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Join Our Weekly Digest
        </h2>
        <p className="text-gray-300 mb-6">
          Get Exclusive Promotions & Updates Straight To Your Inbox.
        </p>

        <div className="flex flex-row">
          <div className="pr-5">
            <input
              type="email"
              placeholder="Enter your email here"
              className="px-4 py-3 rounded-full text-black focus:outline-none border-s-orange-50 bg-white"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 transition text-white font-medium px-6 py-3 rounded-full"
            >
              <Mail size={18} />
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinOurWeeklyDigest;
