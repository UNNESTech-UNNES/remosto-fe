import Feedback from '@/sections/feedback';
import { Suspense } from 'react';
import { Loading } from '@/sections/loading';
import VoiceRecognition from '@/components/voice-recognition';

export default function FeedbackPage() {
  const sectionName = 'Fasilitas Umum';
  const categories = [
    'Informasi Kurang',
    'Ukuran Teks Terlalu Kecil',
    'Video Tidak Sesuai',
    'Tombol Tidak Berfungsi',
    'Lainnya',
  ];

  return (
    <Suspense fallback={<Loading withFooter />}>
      <Feedback section={sectionName} categories={categories} />;
      <VoiceRecognition />
    </Suspense>
  );
}
