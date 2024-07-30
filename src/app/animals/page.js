import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import Footer from '@/components/footer';
import ChevronRightIcon from 'public/assets/icons/navigate-next.svg';
import PlayIcon from 'public/assets/icons/play.svg';
import {
  getAllAnimals,
  getShortestAnimalDistance,
  getDetailAnimal,
  getRecomendationAnimal,
} from '@/services/animal';
import { SessionModal } from '@/components/session-modal';
import { Suspense } from 'react';
import { Loading } from '@/sections/loading';
import VoiceRecognition from '@/components/voice-recognition';

export default function Informasi() {
  return (
    <Suspense fallback={<Loading withFooter />}>
      <main className="min-h-screen bg-forest-f pb-72">
        <TentangGembiraLoka />
        <InformasiTerdekatmu />
        <InformasiLainnya />
        <VoiceRecognition />
        <Footer feedback />
        <SessionModal />
      </main>
    </Suspense>
  );
}

function TentangGembiraLoka() {
  return (
    <section className="py-20 px-32">
      <div className="w-[1200px] flex gap-14 items-center">
        <div className="flex-none w-[448px] h-[280px] rounded-[32px] overflow-hidden bg-black/70">
          <Link href="/animals/video">
            <div className="block w-[448px] h-[280px]">
              <Image
                className="rounded-[32px]"
                alt="thumbnail"
                src="/assets/images/thumbnail-gembira-loka.png"
                width={448}
                height={280}
              />
              <div className="absolute top-[200px] left-[320px]">
                <Button
                  variant="brown"
                  style={{ padding: 16 }}
                  iconOnly
                  icon={<PlayIcon className="scale-150" />}
                />
              </div>
            </div>
          </Link>
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <h3 className="text-forest-c text-4xl font-bold">Tentang Gembira Loka</h3>
          <p className="text-xl text-forest-b">
            Melestarikan tumbuh-tumbuhan dan satwa sesuai dengan alam habitatnya, sehingga bisa
            bermanfaat bagi alam dan kehidupan manusia.
          </p>
          <div className="flex gap-4">
            <Link href="/animals/detail">
              <Button
                text="Baca Selengkapnya"
                variant="dark"
                icon={<PlayIcon />}
                iconPosition="right"
              />
            </Link>
            <Link href="/animals/video">
              <Button text="Tonton" variant="light" icon={<PlayIcon />} iconPosition="right" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

async function InformasiTerdekatmu() {
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
      <div className="grid place-items-center text-xl text-forest-c ">
        Gagal Mengambil Data {':('}
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="px-32 flex justify-between items-center">
        <h3 className="text-forest-c text-4xl font-bold">Hewan Terdekatmu</h3>
        <Link
          href="/animals/nearest"
          className="flex items-center gap-1 text-forest-b active:underline"
        >
          <span className="text-xl">Lihat Semua</span>
          <ChevronRightIcon />
        </Link>
      </div>
      <div className="w-full mt-8 overflow-auto no-scrollbar">
        <div className="w-fit flex gap-5 px-32 pt-3">
          {informasiTerdekat.slice(0, 10).map((item, index) => (
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
      </div>
    </section>
  );
}

async function InformasiLainnya() {
  const { isSuccess, data: informasiLainnya } = await getAllAnimals({ page: 1 })
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
        <h3 className="text-forest-c text-4xl font-bold">Hewan Lainnya</h3>
        <Link
          href="/animals/other"
          className="flex items-center gap-1 text-forest-b active:underline"
        >
          <span className="text-xl">Lihat Semua</span>
          <ChevronRightIcon />
        </Link>
      </div>
      <div className="w-full mt-8 overflow-auto no-scrollbar">
        <div className="w-fit flex gap-5 px-32 pt-3">
          {informasiLainnya.slice(0, 10).map((item, index) => (
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
      </div>
    </section>
  );
}
