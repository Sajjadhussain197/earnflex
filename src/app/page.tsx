import { useEffect } from 'react';
import { useRouter } from 'next/router';
import TableShrimer from '@/components/loading/TalbeShrimmer';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/user-list');
  }, []);

  return (
    <div className="bg-white text-black">
      <TableShrimer/>
    </div>
  );
}
