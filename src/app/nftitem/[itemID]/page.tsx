import NftDetailsPage from '@/components/item/NftDetailsPage';
import { fetchItems } from '@/lib/data';

interface Params {
  itemID: string;
}
interface NftPageProps {
  params: Promise<Params>;
}

export default async function NftPage({ params }: NftPageProps) {
  const { itemID } = await params;
  return <NftDetailsPage itemID={itemID} />;
}

export async function generateStaticParams() {
  const items = await fetchItems();
  return items.map((item) => ({ itemID: item.itemId }));
}
