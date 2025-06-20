import { FC } from "react";
import { Button } from "../ui/button";
import { Rocket } from "lucide-react";
import HeroCardStack from "./HeroCardStack";
import AnimatedNumber from "./AnimatedStat";

const HeroSection: FC = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center px-6 py-16 gap-8 max-container">
      <div className="w-full md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Explore, Collect & Trade Digital Art
        </h1>
        <p className="text-gray-300 mb-6 text-2xl">
          Dive into a next-gen NFT marketplace built with Anima. Discover, buy, and sell unique creations from over 20,000 visionary NFT artists.
        </p>
        <Button className="cta_button text-xl p-3 " size={"lg"}>
          <Rocket /> Get Started
        </Button>
        
        <div className="mt-6 flex text-sm">
          <div className="rounded-2xl flex flex-col items-center justify-center pr-6">
            <div className="flex items-baseline gap-1 mb-2"> 
              <AnimatedNumber
                end={240}
                addCommas 
                className="font-bold text-3xl sm:text-4xl text-white" // Adjust text size and color as needed
              />
              <span className="text-xl sm:text-2xl text-white font-bold">k+</span> 
            </div>
            <h5 className="text-[#A2A2A2] text-lg sm:text-xl font-medium">Total Sale</h5> 
          </div>
          <div className="rounded-2xl flex flex-col items-center justify-center pr-6">
            <div className="flex items-baseline gap-1 mb-2"> 
              <AnimatedNumber
                end={100}
                addCommas 
                className="font-bold text-3xl sm:text-4xl text-white" // Adjust text size and color as needed
              />
              <span className="text-xl sm:text-2xl text-white font-bold">k+</span> 
            </div>
            <h5 className="text-[#A2A2A2] text-lg sm:text-xl font-medium">Auctions</h5> 
          </div>
          <div className="rounded-2xl flex flex-col items-center justify-center">
            <div className="flex items-baseline gap-1 mb-2"> 
              <AnimatedNumber
                end={20}
                addCommas 
                className="font-bold text-3xl sm:text-4xl text-white" // Adjust text size and color as needed
              />
              <span className="text-xl sm:text-2xl text-white font-bold">+</span> 
            </div>
            <h5 className="text-[#A2A2A2] text-lg sm:text-xl font-medium">Creators</h5> 
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <HeroCardStack />
      </div>
    </section>
  );
};

export default HeroSection;
