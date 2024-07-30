import Footer from '@/components/footer';
import Link from 'next/link';
import { ErrorFetch } from '@/components/error-fetch';
import { SessionModal } from '@/components/session-modal';
import { Suspense } from 'react';
import { Loading } from '@/sections/loading';
import { getListInformationByInfra, getAllInfrastructure } from '@/services/information';
import { CardTempatMakan } from '@/components/card';
import { INFRA_TYPE } from '@/enum/infrastructure';
import VoiceRecognition from '@/components/voice-recognition';

export default function InformasiTerdekatmu() {
  return (
    <Suspense fallback={<Loading withFooter />}>
      <main className="min-h-screen bg-forest-f pt-[90px] pb-64 justify-center">
        <Title text="Fasilitas Lainnya" />
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
  const { isSuccess, data: facilities } = await getAllInfrastructure()
    .then((response) => ({
      isSuccess: true,
      data: response,
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
      {facilities.map((item, index) => (
        <Link key={index} href={`/public-facilities/detail/${item.id}?type=${item.type}`}>
          <CardTempatMakan
            title={item?.name || '-'}
            imageSrc={item?.image}
            imageAlt={item?.name}
            openTime={item?.open_time}
            closeTime={item?.close_time}
            xPosition={item?.x}
            yPosition={item?.y}
          />
        </Link>
      ))}
    </div>
  );
}
