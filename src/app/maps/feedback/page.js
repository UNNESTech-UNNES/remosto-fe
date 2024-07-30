import Feedback from '@/sections/feedback';
import { Suspense } from 'react';
import { Loading } from '@/sections/loading';
import VoiceRecognition from '@/components/voice-recognition';

export default function FeedbackPage() {
  const sectionName = 'Maps';
  const categories = [
    'Peta Sulit Dipahami',
    'Ukuran Teks Terlalu Kecil',
    'Peta Tidak Akurat',
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
