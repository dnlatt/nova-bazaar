// lib/data.ts

export const creators = [
    { username: 'PixelPioneer' },
    { username: 'ArtMaster' },
    { username: 'VisualNova' },
  ];
  
  export function getAllUsernames() {
    return creators.map((c) => c.username);
  }
  
  export const nftItems = [
    { itemId: 'item-0001' },
    { itemId: 'item-0002' },
    { itemId: 'item-0003' },
  ];
  
  export function getAllItemIds() {
    return nftItems.map((item) => item.itemId);
  }
  