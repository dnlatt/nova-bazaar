import NftDetailsPage from '@/components/item/NftDetailsPage';
import { getAllItemIds } from '@/lib/data';

interface NftPageProps {
  params: {
    itemId: string;
  };
}

export default function NftPage({ params }: NftPageProps) {
  return <NftDetailsPage itemID={params.itemId} />;
}

export async function generateStaticParams() {
  const itemIds = getAllItemIds();
  return itemIds.map((itemId) => ({ itemId }));
}
