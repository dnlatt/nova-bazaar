// NFTs_Creator.ts

export interface NFTsCreator {
  uuid: string;
  username: string;
  email: string;
  bgImage: string;
  password: string;
  bio: string;
  socials: SocialLinks;
  profileImage: string;
}

export interface SocialLinks {
  twitter?: string;
  instagram?: string;
  facebook?: string;
  website?: string;
}

// NFTs_Category.ts
export interface NFTsCategory {
  categoryId: string;
  categoryName: string;
  categoryImage: string;
}

// NFTs_Collection.ts
export interface NFTsCollection {
  collectionId: string;
  creatorId: string;
  itemId: string; 
  collectionName: string;
  image: string;
}

// NFTs_Item.ts
export interface NFTsItem {
  itemId: string;
  creatorId: string;
  categoryId: string;
  collectionId: string;
  name: string;
  imageUrl: string;
  description: string;
  tags: string[];
}

export interface NFTsItemWithCreator extends NFTsItem {
  creator: Pick<NFTsCreator, 'username' | 'profileImage'> | null;
  categoryName: NFTsCategory['categoryName'] | null;
  collectionName: NFTsCollection['collectionName'] | null;
}

export interface NFTsCreatorRanking extends NFTsCreator {
  nftsSold: number;
  volume: number; // in ETH
  change: number; // percentage, can be negative
}

export interface Card {
  id: number;
  src: string;
  title: string;
}

export interface TrendingCollectionItem {
  img: string;
  title: string;
}

export interface CreatorProps {
  params: {
    username: string;
  };
}

export interface NFTProps {
  params: {
    itemID: string;
  };
}

export interface CreatorDetailsProps { // Renamed to avoid confusion with PageProps
  username: string;
}