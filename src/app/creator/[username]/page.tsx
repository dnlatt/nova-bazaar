import CreatorDetails from '@/components/creator/CreatorDetails';
import { fetchCreators } from '@/lib/data';

interface Params {
  username: string;
}
interface CreatorPageProps {
  params: Promise<Params>;
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const { username } = await params;
  return <CreatorDetails username={username} />;
}

export async function generateStaticParams() {
  const creators = await fetchCreators();
  return creators.map((creator) => ({ username: creator.username }));
}
