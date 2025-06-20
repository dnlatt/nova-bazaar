'use client';

import { useParams } from 'next/navigation';
import NftDetailsPage from '@/components/item/NftDetailsPage';

export default function Page() {
  const params = useParams(); // { itemID: 'some-id' }
  const itemID = params?.itemID as string;

  return <NftDetailsPage itemID={itemID} />;
}
