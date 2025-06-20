import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NFTsCategory, NFTsItem, NFTsCreator, NFTsCollection, NFTsItemWithCreator } from '@/types';

export const nftApi = createApi({
  reducerPath: 'nftApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://raw.githubusercontent.com/dnlatt/data/refs/heads/master/nft_data_bundle/',
  }),
  endpoints: (builder) => ({
    getNftCategories: builder.query<NFTsCategory[], void>({
      query: () => 'NFTs_Categories.json',
    }),
    getNftItems: builder.query<NFTsItem[], void>({
      query: () => 'NFTs_Items.json',
    }),
    getNftCreators: builder.query<NFTsCreator[], void>({
      query: () => 'NFTs_Creator.json',
    }),
    getNftCollections: builder.query<NFTsCollection[], void>({
      query: () => 'NFTs_Creator_Collections.json',
    }),
    getNftItemsWithCreator: builder.query<NFTsItemWithCreator[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
        const [itemsRes, creatorsRes, categoriesRes, collectionsRes] = await Promise.all([
          baseQuery('NFTs_Items.json'),
          baseQuery('NFTs_Creator.json'),
          baseQuery('NFTs_Categories.json'),
          baseQuery('NFTs_Creator_Collections.json'),
        ]);
    
        if (itemsRes.error) return { error: itemsRes.error };
        if (creatorsRes.error) return { error: creatorsRes.error };
        if (categoriesRes.error) return { error: categoriesRes.error };
        if (collectionsRes.error) return { error: collectionsRes.error };
    
        const items = itemsRes.data as NFTsItem[];
        const creators = creatorsRes.data as NFTsCreator[];
        const categories = categoriesRes.data as NFTsCategory[];
        const collections = collectionsRes.data as NFTsCollection[];
    
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
    
        return { data: enrichedItems };
      },
    }),
    
    
  }),
});

export const {
  useGetNftCategoriesQuery,
  useGetNftItemsQuery,
  useGetNftCreatorsQuery,
  useGetNftCollectionsQuery,
  useGetNftItemsWithCreatorQuery,
} = nftApi;
