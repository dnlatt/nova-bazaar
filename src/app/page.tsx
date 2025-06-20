import { FC } from "react";
import Header from "@/components/common/Header";
import HeroSection from "@/components/home/HeroSection";
import TrendingCollection from "@/components/home/TrendingCollection";
import BrowseCategories from "@/components/common/BrowseCategories";
import DiscoverMoreProducts from "@/components/home/DiscoverMoreProducts";
import HowItWorks from "@/components/common/HowItWorks";
import Footer from "@/components/common/Footer";
import JoinOurWeeklyDigest from "@/components/home/JoinOurWeeklyDigest";
import TopCreators from "@/components/home/TopCreators";

const Home: FC = () => {
  return (
    <main className="font-sans">
      <Header />
      <HeroSection />
      <TrendingCollection />
      <TopCreators />
      <DiscoverMoreProducts />
      <BrowseCategories />
      <HowItWorks />
      <JoinOurWeeklyDigest />
      <Footer />
    </main>
  );
};

export default Home;