import { Card, TrendingCollectionItem } from "@/types";

export const initialCards: Card[] = [
    { id: 1, src: "/images/home/hero/hero2.png", title: "Space Walking" },
    { id: 2, src: "/images/home/hero/hero.png", title: "Space Tales" },
    { id: 3, src: "/images/home/hero/hero3.png", title: "Life On Edena" },
    { id: 4, src: "/images/home/hero/hero4.png", title: "Cherry Blossom Girl 037" },
  ];

export const SWIPE_THRESHOLD = 150;

export const trendingCollections: TrendingCollectionItem[] = [
  {
    img: "/images/trending/trending1.png",
    title: "DGSN Animals",
  },
  {
    img: "/images/trending/trending2.png",
    title: "Magic Mushrooms",
  },
  {
    img: "/images/trending/trending3.png",
    title: "Disco Machines",
  },
];

export const steps = [
  { title: "Setup Your Wallet", 
    desc: "Set up your wallet of choice. Connect it to the Animarket by clicking the wallet icon in the top.",
    imgURL: "/images/home/setup_wallet.png"
  },
  { title: "Create Collection", 
    desc: "Upload your work and setup your collection. Add a description, social links and floor price.",
    imgURL: "/images/home/create_collection.png"
  },
  { title: "Start Earning", 
    desc: "Choose between auctions and fixed-price listings. Start earning by selling your NFTs or trading others.",
    imgURL: "/images/home/start_earning.png"
  }
];