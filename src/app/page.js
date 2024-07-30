'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/button';
import HomeIcon from 'public/assets/icons/home.svg';
import StatisticIcon from 'public/assets/icons/statistic-icon.svg';
import { useState } from 'react';
import VoiceRecognition from '@/components/voice-recognition';

export default function Home() {
  const [showOperatorWarn, setShowOperatorWarn] = useState(false);
  return (
    <main className="flex float-none min-h-screen items-center flex-col bg-home bg-no-repeat bg-center bg-cover">
      <div className="inline-flex mt-[72px]">
        <div className="flex">
          <Image
            width={99.75}
            height={99.75}
            alt="logo gembira loka"
            src="/assets/logos/logo-gembira-loka.svg"
          />
        </div>
        <div className="flex">
          <Image
            width={62}
            height={71.97}
            alt="logo remosto"
            src="/assets/logos/logo-remosto.svg"
          />
        </div>
      </div>

      <div className=" text-white text-6xl top[207px] font-extrabold">Pilih Layanan Kami</div>

      <div className="my-[62px] inline-flex gap-6 justify-center">
        <MenuCard src="/assets/images/menu-zona-hewan.png" text="Zona Hewan" href="/animals" />
        <MenuCard
          src="/assets/images/menu-fasilitas-umum.png"
          text="Fasilitas Umum"
          href="/public-facilities"
        />
        <MenuCard src="/assets/images/menu-lihat-maps.png" text="Lihat Maps" href="/maps" />
        <MenuCard
          src="/assets/images/menu-tempat-makan.png"
          text="Tempat Makan"
          href="/food-store"
        />
        <MenuCard
          src="/assets/images/menu-beri-feedback.png"
          text="Beri Feedback"
          href="/feedback"
        />
      </div>

      <div className=" justify-center flex self-center w-auto gap-8">
        <button className="mt-16 inline-flex bg-[#D00] w-[420px] h-[122px] rounded-[61px] justify-start pl-6 self-center z-10 gap-8 shadow-bantuan active:scale-90 transition-all duration-50">
          <div className="justify-center self-center">
            <Image
              className=""
              alt="icon bantuan"
              width={81}
              height={81}
              src={'assets/images/home-megafon.svg'}
            />
          </div>
          <div className=" text-3xl font-bold self-center">Panggil Bantuan</div>
        </button>

        <button
          onClick={() => setShowOperatorWarn(!showOperatorWarn)}
          className="mt-16 inline-flex bg-[#DDAC00] w-[420px] h-[122px] rounded-[61px] justify-start pl-6 self-center z-10 gap-8 shadow-bantuan active:scale-90 transition-all duration-50"
        >
          <div className="justify-center self-center">
            <Image
              className=""
              alt="icon bantuan"
              width={81}
              height={81}
              src={'/assets/icons/dashboard-icon.svg'}
            />
          </div>
          <div className=" text-3xl font-bold self-center">Dashboard</div>
        </button>
      </div>

      <Image
        className="absolute bottom-[0px]"
        width={1920}
        height={493}
        src={'/assets/images/home-hewan.png'}
        alt="background hewan"
      />

      {showOperatorWarn && <DashboardModal buttonClose={() => setShowOperatorWarn(false)} />}
      
      <VoiceRecognition />
    </main>
  );
}

function MenuCard({ href, src, text }) {
  return (
    <Link href={href ? href : '#'} className="z-10">
      <div className="bg-white w-[260px] h-[360px] border-8 rounded-[38px] border-primary justify-center self-center p-8 flex flex-wrap gap-y-8 shadow-bantuan active:scale-90 transition-all duration-50">
        <div className="flex justify-center self-center h-40 w-[180px]">
          <Image alt="Tombol Menu" width={180} height={160} src={src} />
        </div>
        <div className="text-forest-c  flex text-[36px] w-3/4 justify-center flex-wrap text-center font-semibold leading-[120%]">
          {text}
        </div>
      </div>
    </Link>
  );
}

function DashboardModal({ buttonClose, buttonNext }) {
  return (
    <div
      id="popup"
      className="h-screen w-full bg-black bg-opacity-40 fixed top-0 z-20 justify-center flex"
    >
      <div className="flex justify-center pt-[180px] fixed z-40">
        <Image
          className="flex justify-center"
          alt="ok"
          src="/assets/icons/warning-icon.svg"
          width={198}
          height={238}
        />
      </div>
      <div className="bg-gradient-2 shadow-[0px_8px_0px_0px] shadow-forest-b w-[550px] py-16 top-[288px] fixed z-30 flex justify-center items-center rounded-3xl">
        <div className="w-[365px] h-fit pt-8 flex flex-col items-center justify-center">
          <div className="text-forest-b font-semibold text-5xl text-center self-center pt-12 pb-12">
            Mohon maaf, halaman ini hanya untuk operator
          </div>
          <div className="flex w-full px-6 gap-6 justify-center">
            <Button
              icon={<HomeIcon />}
              iconPosition="left"
              text="Kembali"
              variant="dark"
              onClick={() => buttonClose()}
            />
            <Link href={'https://dashboard-remosto-v2-ujrltkkgyq-et.a.run.app/'}>
              <Button
                icon={<StatisticIcon />}
                iconPosition="left"
                text="Lanjutkan"
                variant="light"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
