import Feedback from '@/sections/feedback';
import { Suspense } from 'react';
import { Loading } from '@/sections/loading';
import VoiceRecognition from '@/components/voice-recognition';

export default function FeedbackPage() {
  const sectionName = 'Tempat Makan';
  const categories = [
    'Menu Tidak Lengkap',
    'Informasi Tidak Sesuai',
    'Menu Kurang',
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
