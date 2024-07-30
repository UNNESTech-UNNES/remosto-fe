import { Card } from '@/components/card';
import Footer from '@/components/footer';
import Link from 'next/link';
import { getShortestAnimalDistance } from '@/services/animal';
import { ErrorFetch } from '@/components/error-fetch';
import { SessionModal } from '@/components/session-modal';
import { Suspense } from 'react';
import { Loading } from '@/sections/loading';
import VoiceRecognition from '@/components/voice-recognition';

export default function InformasiTerdekatmu() {
  return (
    <Suspense fallback={<Loading withFooter />}>
      <main className="min-h-screen bg-forest-f pt-[90px] pb-64 justify-center">
        <Title text="Hewan Terdekatmu" />
        <Informasi />
        <Footer feedback />
        <SessionModal />
        <VoiceRecognition />
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

async function Informasi() {
  const { isSuccess, data: informasiTerdekat } = await getShortestAnimalDistance({
    xPosition: 0,
    yPosition: 0,
  })
    .then((response) => ({
      isSuccess: true,
      data: response.data,
    }))
    .catch((error) => ({
      isSuccess: false,
      data: null,
    }));

  if (!isSuccess) {
    return (
      <section className="w-full pt-64 grid place-items-center">
        <ErrorFetch />
      </section>
    );
  }

  return (
    <div className="flex flex-wrap gap-5 justify-center mx-[354px]">
      {informasiTerdekat.map((item, index) => (
        <Link key={index} href={`/animals/detail/${item.id}`}>
          <Card
            title={item?.name || '-'}
            description={item?.animal_categories?.name || '-'}
            imageSrc={item?.image}
            imageAlt={item?.name}
          />
        </Link>
      ))}
    </div>
  );
}
