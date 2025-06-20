'use client';

import { useParams } from 'next/navigation';
import CreatorDetails from '@/components/creator/CreatorDetails';

export default function CreatorPage() {
  const params = useParams(); // 👈 works in client components only
  const username = params?.username as string;

  return <CreatorDetails username={username} />;
}
