import Link from 'next/link';
import Footer from '@/components/footer';
import ChevronRightIcon from 'public/assets/icons/navigate-next.svg';
import { SessionModal } from '@/components/session-modal';
import { Suspense } from 'react';
import { Loading } from '@/sections/loading';
import { getListShortestInformation, getListInformationByInfra, getAllInfrastructure } from '@/services/information';
import { CardTempatMakan } from '@/components/card';
import { INFRA_TYPE } from '@/enum/infrastructure';
import VoiceRecognition from '@/components/voice-recognition';

export default function Informasi() {
  return (
    <Suspense fallback={<Loading withFooter />}>
      <main className="min-h-screen bg-forest-f pt-20 pb-72">
        <InformasiTerdekatmu />
        <InformasiLainnya />
        <Footer feedback />
        <SessionModal />
        <VoiceRecognition />
      </main>
    </Suspense>
  );
}

async function InformasiTerdekatmu() {
  const { isSuccess, data: informasiTerdekat } = await getListShortestInformation({
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
      <div className="grid place-items-center text-xl text-forest-c ">
        Gagal Mengambil Data {':('}
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="px-32 flex justify-between items-center">
        <h3 className="text-forest-c text-4xl font-bold">Fasilitas Terdekatmu</h3>
        <Link
          href="/public-facilities/nearest"
          className="flex items-center gap-1 text-forest-b active:underline"
        >
          <span className="text-xl">Lihat Semua</span>
          <ChevronRightIcon />
        </Link>
      </div>
      <div className="w-full mt-8 overflow-auto no-scrollbar">
        <div className="w-fit flex gap-5 px-32 pt-3">
          {informasiTerdekat.slice(0, 10).map((item, index) => (
            <Link key={index} href={`/public-facilities/detail/${item.id}`}>
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
      </div>
    </section>
  );
}

async function InformasiLainnya() {
  const { isSuccess, data: informasiLainnya } = await getAllInfrastructure()
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
      <div className="grid place-items-center text-xl text-forest-c ">
        Gagal Mengambil Data {':('}
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="px-32 flex justify-between items-center">
        <h3 className="text-forest-c text-4xl font-bold">Fasilitas Lainnya</h3>
        <Link
          href="/public-facilities/other"
          className="flex items-center gap-1 text-forest-b active:underline"
        >
          <span className="text-xl">Lihat Semua</span>
          <ChevronRightIcon />
        </Link>
      </div>
      <div className="w-full mt-8 overflow-auto no-scrollbar">
        <div className="w-fit flex gap-5 px-32 pt-3">
          {informasiLainnya.slice(0, 10).map((item, index) => (
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
      </div>
    </section>
  );
}
