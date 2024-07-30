'use client';

import Footer from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { SmallCard, CardMakanan } from '@/components/card';
import { ErrorFetch } from '@/components/error-fetch';
import { SessionModal } from '@/components/session-modal';
import { Suspense, useState, useEffect } from 'react';
import { Loading } from '@/sections/loading';
import { Button } from '@/components/button';
import PlayIcon from 'public/assets/icons/play.svg';
import { getDetailPublicFacility, getRecomendationPublicFacility } from '@/services/information';
import ClockIcon from 'public/assets/icons/alarm-lg.svg';
import LocationIcon from 'public/assets/icons/distance-lg.svg';
import { distanceFromHere } from '@/utils/distance';
import { useSearchParams } from 'next/navigation';
import { getListProductsOnStore } from '@/services/store';
import VoiceRecognition from '@/components/voice-recognition';

export default function DetailInformasii({ params }) {
  const searchParams = useSearchParams();
  const type = parseInt(searchParams.get('type'));
  return (
    <Suspense fallback={<Loading withFooter />}>
      <main className="min-h-screen bg-forest-f py-[90px]">
        <Detail id={params.id} type={type} />
        <Footer feedback />
        <SessionModal />
        <VoiceRecognition />
      </main>
    </Suspense>
  );
}

function Detail({ id, type }) {
  const [isSuccess, setIsSuccess] = useState(true);
  const [detailInformasi, setDetailInformasi] = useState({});

  useEffect( () => {
    async function getDetail(){
      await getDetailPublicFacility({ id, type })
      .then((response) => (
        setDetailInformasi(response.data)
      ))
      .catch((error) => {
        setIsSuccess(false);
      });
    } 
    getDetail()
  }, [id, type])

  if (!isSuccess) {
    return (
      <section className="w-full pt-64 grid place-items-center">
        <ErrorFetch />
      </section>
    );
  }

  return (
    <div className="mx-28">
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
              <div className="absolute top-[250px] left-[335px]">
                <Link href={`/public-facilities/video/${id}`}>
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
        <div className='flex flex-col'>
        <Description
          title={`Tentang ${detailInformasi.name}`}
          description={detailInformasi.desc}
          xPosition={detailInformasi.x}
          yPosition={detailInformasi.y}
          openTime={detailInformasi.open_time}
          closeTime={detailInformasi.close_time}
        />
        {type === 3 && <Souvenirs id={id} />}
        </div>
      </div>
    </div>
  );
}

function Description({ title, description, openTime, closeTime, xPosition, yPosition }) {
  const storeDistance =
    Math.floor(distanceFromHere({ xPosition: xPosition, yPosition: yPosition }) / 10) / 10;

  return (
    <div className="flex flex-col gap-8 w-[1186px]">
      <div>
        <div className="py-8 px-12 bg-forest-g rounded-2xl">
          <h3 className="text-[40px] font-semibold text-forest-b">{title}</h3>
          <p className="mt-4 text-2xl text-forest-b">{description}</p>
        </div>
        <div className="flex gap-1 mt-1">
          <div className="flex-auto bg-forest-g py-8 rounded-2xl flex justify-center items-center gap-6 shadow-[0_4px_0_0_#D4BF88]">
            <span className="flex items-center gap-2">
              <ClockIcon />
              <span className="text-[24px] text-forest-b font-medium">Buka</span>
            </span>
            <span className="text-[32px] text-forest-d font-semibold">
              {openTime} - {closeTime}
            </span>
          </div>
          <div className="flex-auto bg-forest-g py-8 rounded-2xl flex justify-center items-center gap-6 shadow-[0_4px_0_0_#D4BF88]">
            <span className="flex items-center gap-2">
              <LocationIcon />
              <span className="text-[24px] text-forest-b font-medium">Jarak dari sini</span>
            </span>
            <span className="text-[32px] text-forest-d font-semibold">{storeDistance}m</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InformasiLain() {
  const [rekomendasi, setRekomendasi] = useState([]);
  const [isSuccess, setIsSuccess] = useState(true)

  useEffect(() => {
    async function getRecomendation(){
      await getRecomendationPublicFacility()
      .then((response) => (setRekomendasi(response.data)))
      .catch((error) => (
        setIsSuccess(false)
      ));
    }
    getRecomendation()
  }, [])

  if (!isSuccess) {
    return;
  }

  return (
    <div className="rounded-t-3xl rounded-b-3xl w-full mt-[60px] py-4 text-forest-c flex flex-col gap-10">
      <div className=" flex justify-between items-center w-full text-xl h-fit">
        <div className="text-2xl font-bold">Baca Juga</div>
        <Link href={'/public-facilities/other'}>
          <div className="text-xl inline-flex h-fit active:underline">
            Lihat Semua
            <Image width={24} height={24} alt="all" src={'/assets/icons/navigate-next.svg'} />
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-6">
        {rekomendasi.slice(0, 4).map((item, index) => (
          <Link key={index} href={`/public-facilities/detail/${item.id}`}>
            <SmallCard
              title={item?.name || '-'}
              description={item?.infrastructure?.name || '-'}
              img={item?.image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

function Souvenirs({ id }) {
  const [products, setProducts] = useState([])

  useEffect( () => {
    async function getProducts(){
      await getListProductsOnStore({ id })
      .then((response) => (
        setProducts(response.data)
      ))
      .catch((error) => {
        setIsSuccess(false);
      });
    }

    getProducts()
  }, [id])

  return (
    <div className="m-6 flex flex-wrap gap-6 justify-evenly">
      {products.map((product, index) => (
        <div key={index} className='h-[360px]'>
          <CardMakanan
            title={product.name}
            price={product.price}
            imageSrc={product.image}
            imageAlt={'gambar'}
            description={product.desc}
          />
        </div>
      ))}
    </div>
  );
}
