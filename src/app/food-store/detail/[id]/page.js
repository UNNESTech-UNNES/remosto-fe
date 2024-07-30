import Footer from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/button';
import ClockIcon from 'public/assets/icons/alarm-lg.svg';
import LocationIcon from 'public/assets/icons/distance-lg.svg';
import TagIcon from 'public/assets/icons/sell-lg.svg';
import PlayIcon from 'public/assets/icons/play.svg';
import { CardMakanan } from '@/components/card';
import { ErrorFetch } from '@/components/error-fetch';
import { getDetailStore, getListProductsOnStore } from '@/services/store';
import { SessionModal } from '@/components/session-modal';
import { distanceFromHere } from '@/utils/distance';
import { Suspense } from 'react';
import { Loading } from '@/sections/loading';
import VoiceRecognition from '@/components/voice-recognition';

export default function DetailTempatMakan({ params }) {
  return (
    <Suspense fallback={<Loading withFooter />}>
      <main className="bg-forest-f min-h-screen pt-4 pb-60">
        <InformasiTempatMakan storeId={params.id} />
        <Menu storeId={params.id} />
        <Footer feedback />
        <SessionModal />
        <VoiceRecognition />
      </main>
    </Suspense>
  );
}

async function InformasiTempatMakan({ storeId }) {
  const { isSuccess, data: store } = await getDetailStore({ id: storeId })
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
      <section className="w-full pt-64 pb-20 grid place-items-center">
        <ErrorFetch />
      </section>
    );
  }

  const storeDistance =
    Math.floor(distanceFromHere({ xPosition: store.x, yPosition: store.y }) / 10) / 10;

  return (
    <section className="flex gap-12 px-20 py-16">
      <div className="flex-none w-[586px] h-[440px] aspect-[4/3] bg-black/20 rounded-2xl overflow-hidden">
        <Image
          src={store.image}
          alt="image"
          width={586}
          height={440}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-8 w-full">
        <div>
          <div className="py-8 px-12 bg-forest-g rounded-2xl">
            <h3 className="text-[40px] font-semibold text-forest-b">{store.name}</h3>
            <p className="mt-4 text-2xl text-forest-b">{store.desc}</p>
          </div>
          <div className="flex gap-1 mt-1">
            <div className="flex-auto bg-forest-g py-8 rounded-2xl flex justify-center items-center gap-6 shadow-[0_4px_0_0_#D4BF88]">
              <span className="flex items-center gap-2">
                <ClockIcon />
                <span className="text-[24px] text-forest-b font-medium">Buka</span>
              </span>
              <span className="text-[32px] text-forest-d font-semibold">
                {store.open_time} - {store.close_time}
              </span>
            </div>
            <div className="flex-auto bg-forest-g py-8 rounded-2xl flex justify-center items-center gap-6 shadow-[0_4px_0_0_#D4BF88]">
              <span className="flex items-center gap-2">
                <LocationIcon />
                <span className="text-[24px] text-forest-b font-medium">Jarak dari sini</span>
              </span>
              <span className="text-[32px] text-forest-d font-semibold">{storeDistance}m</span>
            </div>
            <div className="flex-auto bg-forest-g py-8 rounded-2xl flex justify-center items-center gap-6 shadow-[0_4px_0_0_#D4BF88]">
              <span className="flex items-center gap-2">
                <TagIcon />
              </span>
              <span className="text-[32px] text-forest-d font-semibold">
                {Math.floor(store.low_price / 1000)}k - {Math.floor(store.high_price / 1000)}k
              </span>
            </div>
          </div>
        </div>
        <Link href={`/maps?id=${store.id}&type=store`}>
          <Button text="Tunjukkan Jalan" variant="dark" icon={<PlayIcon />} iconPosition="right" />
        </Link>
      </div>
    </section>
  );
}

async function Menu({ storeId }) {
  const { isSuccess, data: menus } = await getListProductsOnStore({ id: storeId })
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
        Gagal Mengambil Data Menu {':('}
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="px-20 ">
        <h3 className="text-forest-c text-center text-4xl font-bold">Menu Kami</h3>
      </div>
      <div className="w-full mt-8 overflow-auto no-scrollbar">
        <div className="w-fit h-[360px] flex gap-5 px-20 pt-3">
          {menus.map((menu, index) => (
            <CardMakanan
              key={index}
              title={menu.name}
              price={menu.price}
              imageSrc={menu.image}
              imageAlt={'gambar'}
              description={menu.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
