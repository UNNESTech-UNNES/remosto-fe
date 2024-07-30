'use client';

import { Button } from './button';
import { useRouter } from 'next/navigation';

export function ErrorFetch({ message = 'Gagal Mengambil Data dari Server' }) {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center gap-6 fixed w-screen h-screen z-40 bg-inherit">
      <span className="text-4xl text-forest-c font-bold">{`:'(`}</span>
      <span className="text-2xl text-forest-c">{message}</span>
      <Button onClick={() => router.refresh()} text="Reload Halaman" />
    </div>
  );
}
