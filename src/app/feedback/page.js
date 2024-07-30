import Feedback from '@/sections/feedback';
import { Suspense } from 'react';
import { Loading } from '@/sections/loading';
import VoiceRecognition from '@/components/voice-recognition';

export default function FeedbackPage() {
  const sectionName = 'Root';
  const categories = [
    'Pelayanan Robot',
    'Pelayanan Petugas',
    'Fasilitas Umum',
    'Kebersihan Lingkungan',
    'Lainnya',
  ];

  return (
    <Suspense fallback={<Loading withFooter />}>
      <Feedback section={sectionName} categories={categories} />;
      <VoiceRecognition />
    </Suspense>
  );
}
