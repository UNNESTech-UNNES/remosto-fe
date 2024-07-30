import Footer from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { SmallCard } from '@/components/card';
import { ErrorFetch } from '@/components/error-fetch';
import { getAllAnimals, getDetailAnimal, getRecomendationAnimal } from '@/services/animal';
import { SessionModal } from '@/components/session-modal';
import { Suspense } from 'react';
import { Loading } from '@/sections/loading';
import { Button } from '@/components/button';
import PlayIcon from 'public/assets/icons/play.svg';
import VoiceRecognition from '@/components/voice-recognition';

export default async function DetailInformasi({ params }) {
  return (
    <Suspense fallback={<Loading withFooter />}>
      <main className="min-h-screen bg-forest-f py-[90px]">
        <Detail animalId={params.id} />
        <Footer feedback />
        <SessionModal />
        <VoiceRecognition />
      </main>
    </Suspense>
  );
}

async function Detail({ animalId }) {
  const { isSuccess, data: detailInformasi } = await getDetailAnimal({ animalId: animalId })
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
    <>
      <Title text={detailInformasi.name} />
      <div className="flex w-full h-auto justify-center gap-6 mb-[237px]">
        <div className="flex-none w-[496px] flex flex-col">
          <div className="block w-[496.62px] aspect-[4/3] bg-black/20 rounded-[32px] overflow-hidden">
            <Image
              alt="thumbnail"
              src={detailInformasi.image}
              width={496.62}
              height={372}
              className="w-full h-full object-cover"
            />
            {detailInformasi.video && (
              <div className="absolute top-[400px] left-[335px]">
                <Link href={`/animals/video/${animalId}`}>
                  <Button
                    variant="brown"
                    style={{ padding: 16 }}
                    iconOnly
                    icon={<PlayIcon className="scale-150" />}
                  />
                </Link>
              </div>
            )}
          </div>
          <InformasiLain />
        </div>
        <Description title={`Tentang ${detailInformasi.name}`} description={detailInformasi.desc} />
      </div>
    </>
  );
}

function Title({ text }) {
  return (
    <div className="text-center w-full  text-[40px] font-bold text-forest-c flex justify-center mb-[90px]">
      {text}
    </div>
  );
}

function Description({ title, description }) {
  return (
    <div className="flex flex-col bg-white w-[1186px] p-[46px] gap-8 rounded-2xl ">
      <div className="text-forest-c font-bold text-[32px] ">{title}</div>
      <p className=" text-2xl text-black">{description}</p>
    </div>
  );
}

async function InformasiLain() {
  const { isSuccess, data: rekomendasi } = await getRecomendationAnimal()
    .then((response) => ({
      isSuccess: true,
      data: response.data,
    }))
    .catch((error) => ({
      isSuccess: false,
      data: null,
    }));

  if (!isSuccess) {
    return;
  }

  return (
    <div className="rounded-t-3xl rounded-b-3xl w-full mt-[60px] py-4 text-forest-c flex flex-col gap-10">
      <div className=" flex justify-between items-center w-full text-xl h-fit">
        <div className="text-2xl font-bold">Baca Juga</div>
        <Link href={'/animals/other'}>
          <div className="text-xl inline-flex h-fit active:underline">
            Lihat Semua
            <Image width={24} height={24} alt="all" src={'/assets/icons/navigate-next.svg'} />
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-6">
        {rekomendasi.slice(0, 4).map((item, index) => (
          <Link key={index} href={`/animals/detail/${item.id}`}>
            <SmallCard
              title={item?.name || '-'}
              description={item?.animal_categories?.name || '-'}
              img={item?.image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
