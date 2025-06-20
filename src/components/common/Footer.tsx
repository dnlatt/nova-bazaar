import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="px-6 py-12 bg-[#1C1C24] text-gray-400 text-sm max-container">
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6 mb-6">
        <div>
          <h4 className="text-white text-lg font-bold mb-2">NFT Marketplace</h4>
          <p>UI created with Anima. Collect, Buy and Sell NFTs from 20k+ artists.</p>
        </div>
        <div>
          <h4 className="text-white text-lg font-bold mb-2">Explore</h4>
          <ul className="space-y-2">
            <li>Marketplace</li>
            <li>Rankings</li>
            <li>Connect a Wallet</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-lg font-bold mb-2">Join Our Weekly Digest</h4>
          <p>Get exclusive promotions & updates straight to your inbox.</p>
          <div className="mt-2 flex gap-2">
            <input type="email" className="p-2 rounded bg-[#2B2B2B] text-white flex-1" placeholder="Enter your email" />
            <button className="bg-purple-600 px-4 py-2 rounded text-white text-sm">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="text-center border-t border-gray-600 pt-4">© 2025 NFT Marketplace. All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;
