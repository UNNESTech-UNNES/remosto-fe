import Link from 'next/link';
import Footer from '@/components/footer';
import { CardTempatMakan } from '@/components/card';
import { ErrorFetch } from '@/components/error-fetch';
import { getListShortestStoresFnB } from '@/services/store';
import { SessionModal } from '@/components/session-modal';
import { Suspense } from 'react';
import { Loading } from '@/sections/loading';
import VoiceRecognition from '@/components/voice-recognition';

export default async function TempatMakan() {
  return (
    <Suspense fallback={<Loading withFooter />}>
      <main className="min-h-screen bg-forest-f pt-[90px] justify-center pb-64">
        <Title text="Tempat Makan" />
        <Cards />
        <VoiceRecognition />
        <Footer feedback />
        <SessionModal />
      </main>
    </Suspense>
  );
}

function Title({ text }) {
  return (
    <div className="text-center w-full text-[40px] font-bold text-forest-c flex justify-center mb-[90px]">
      {text}
    </div>
  );
}

async function Cards() {
  const { isSuccess, data: stores } = await getListShortestStoresFnB({ xPosition: 0, yPosition: 0 })
    .then((response) => ({
      isSuccess: true,
      data: response.data,
    }))
    .catch((error) => ({
      isSuccess: false,
      data: null,
    }));

  if (!isSuccess) {
    return <ErrorFetch />;
  }

  return (
    <div className="flex flex-wrap gap-5 justify-center mx-[354px]">
      {stores.map((value, index) => (
        <Link key={index} href={'/food-store/detail/' + value.id}>
          <CardTempatMakan
            imageSrc={value.image}
            imageAlt={'gambar'}
            title={value.name}
            openTime={value.open_time}
            closeTime={value.close_time}
            xPosition={value.x}
            yPosition={value.y}
          />
        </Link>
      ))}
    </div>
  );
}
