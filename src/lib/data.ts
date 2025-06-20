import { NFTsItem, NFTsCreator, NFTsCollection, NFTsCategory, NFTsItemWithCreator } from '@/types';

const BASE_URL = 'https://raw.githubusercontent.com/dnlatt/data/refs/heads/master/nft_data_bundle';

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}/${path}`);
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json();
}

// ✅ Raw data fetchers
export async function fetchCreators(): Promise<NFTsCreator[]> {
  return fetchJSON<NFTsCreator[]>('NFTs_Creator.json');
}

export async function fetchItems(): Promise<NFTsItem[]> {
  return fetchJSON<NFTsItem[]>('NFTs_Items.json');
}

export async function fetchCategories(): Promise<NFTsCategory[]> {
  return fetchJSON<NFTsCategory[]>('NFTs_Categories.json');
}

export async function fetchCollections(): Promise<NFTsCollection[]> {
  return fetchJSON<NFTsCollection[]>('NFTs_Creator_Collections.json');
}

// ✅ Fully enriched NFT items, similar to RTK Query's `getNftItemsWithCreator`
export async function fetchItemsWithCreator(): Promise<NFTsItemWithCreator[]> {
  const [items, creators, categories, collections] = await Promise.all([
    fetchItems(),
    fetchCreators(),
    fetchCategories(),
    fetchCollections(),
  ]);

  const creatorMap = new Map(creators.map(c => [c.uuid, c]));
  const categoryMap = new Map(categories.map(c => [c.categoryId, c.categoryName]));
  const collectionMap = new Map(collections.map(c => [c.collectionId, c.collectionName]));

  const enrichedItems: NFTsItemWithCreator[] = items.map(item => ({
    ...item,
    creator: creatorMap.has(item.creatorId)
      ? {
          username: creatorMap.get(item.creatorId)!.username,
          profileImage: creatorMap.get(item.creatorId)!.profileImage,
        }
      : null,
    categoryName: categoryMap.get(item.categoryId) ?? null,
    collectionName: collectionMap.get(item.collectionId) ?? null,
  }));

  return enrichedItems;
}
