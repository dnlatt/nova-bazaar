import CreatorDetails from '@/components/creator/CreatorDetails';
import { getAllUsernames } from '@/lib/data';

interface CreatorPageProps {
  params: {
    username: string;
  };
}

export default function CreatorPage({ params }: CreatorPageProps) {
  return <CreatorDetails username={params.username} />;
}

export async function generateStaticParams() {
  const usernames = getAllUsernames();
  return usernames.map((username) => ({ username }));
}
