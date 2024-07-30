'use client';

import Image from 'next/image';
import LocationIcon from 'public/assets/icons/distance.svg';
import ClockIcon from 'public/assets/icons/alarm.svg';
import TagIcon from 'public/assets/icons/sell.svg';
import { formatNumber } from '@/utils/number';
import { distanceFromHere } from '@/utils/distance';
import { useState } from 'react';

export function Card({ imageSrc, imageAlt, title, description, ...props }) {
  return (
    <div
      className="bg-white rounded-[28px] w-72 h-full p-3.5 pb-14 flex flex-col items-center gap-6 shadow-[0_6px_0_0_rgba(0,0,0,0.20)] active:shadow-none relative bottom-[6px] active:bottom-0"
      {...props}
    >
      <div className="bg-gray-300 w-full aspect-[3/2] rounded-3xl overflow-hidden">
        <Image
          alt={imageAlt}
          src={imageSrc}
          width={260}
          height={174}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-forest-c">{title}</h3>
        <span className="text-xl font-normal text-neutral-50">{description}</span>
      </div>
    </div>
  );
}

export function SmallCard({ img, title, description, ...props }) {
  return (
    <button
      className="p-[14px] h-fit w-full pr-6 bg-white flex items-center gap-6 rounded-2xl mt-[-8px] mb-[8px] shadow-[#B8B294] shadow-[0px_8px_0px_0px] active:shadow-[0px_0px_0px_0px] active:mt-0 active:mb-0"
      {...props}
    >
      <div className="flex-none w-[86px] h-[86px] rounded-xl overflow-hidden">
        <Image
          alt="informasi"
          src={img}
          width={86}
          height={86}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="text-left">
        <div className="text-2xl font-semibold text-forest-b">{title}</div>
        <div className="text-xl text-forest-d">{description}</div>
      </div>
    </button>
  );
}

export function CardTempatMakan({
  imageSrc,
  imageAlt,
  title,
  openTime,
  closeTime,
  xPosition,
  yPosition,
  ...props
}) {
  const distance =
    Math.floor(distanceFromHere({ xPosition: xPosition, yPosition: yPosition }) / 10) / 10;

  return (
    <div
      className="bg-white rounded-[28px] w-72 h-full p-3.5 pb-10 flex flex-col gap-6 shadow-[0_6px_0_0_rgba(0,0,0,0.20)] active:shadow-none relative bottom-[6px] active:bottom-0"
      {...props}
    >
      <div className="bg-gray-300 w-full aspect-[3/2] rounded-3xl overflow-hidden">
        <Image
          alt='image card-tempat-makan'
          src={imageSrc}
          width={260}
          height={174}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-4">
        <h3 className="text-2xl font-semibold text-forest-c">{title}</h3>
        <div className="flex items-center gap-1 pt-3">
          <LocationIcon />
          <span className="text-xl font-normal text-neutral-50">{distance}m dari sini</span>
        </div>
        <div className="flex items-center gap-1 pt-1">
          <ClockIcon />
          <span className="text-xl font-normal text-neutral-50">
            {openTime} - {closeTime}
          </span>
        </div>
      </div>
    </div>
  );
}

export function CardMakanan({ imageSrc, imageAlt, title, price, description, ...props }) {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <button
      onClick={() => setShowDetail(!showDetail)}
      className="bg-white rounded-[28px] w-72 h-full p-3.5 pb-10 flex flex-col gap-6 shadow-[0_6px_0_0_rgba(0,0,0,0.20)] active:shadow-none relative bottom-[6px] active:bottom-0 text-forest-c text-left"
      {...props}
    >
      {showDetail ? (
        <div className="overflow-y-auto">
          <h3 className="text-2xl font-semibold text-forest-c">{title}</h3>
          <div className="text-xl font-medium">{description}</div>
        </div>
      ) : (
        <>
          <div className="bg-gray-300 w-full aspect-[3/2] rounded-3xl overflow-hidden">
            <Image
              alt={imageAlt}
              src={imageSrc}
              width={260}
              height={174}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-4">
            <h3 className="text-2xl font-semibold text-forest-c">{title}</h3>
            <div className="flex items-center gap-1 pt-3">
              <TagIcon />
              <span className="text-xl font-normal text-neutral-50">Rp{formatNumber(price)}</span>
            </div>
          </div>
        </>
      )}
    </button>
  );
}

export function FacilityCard({
  onClick,
  img,
  title = 'Judul',
  status = 'Buka',
  variant = 'white',
  category = 'category',
}) {
  const variantClassName = variant === 'white' ? 'bg-white' : 'bg-forest-g';
  let textSizeClassName = ' text-[26px] ';
  if (title.length > 17) {
    textSizeClassName = ' text-[18px] ';
  }
  return (
    <>
      <button
        onClick={onClick}
        className={
          variantClassName +
          ' p-[14px] h-fit pr-6 flex gap-6 rounded-2xl mt-[-8px] mb-[8px] shadow-[#B8B294] shadow-[0px_8px_0px_0px] active:shadow-[0px_0px_0px_0px] active:mt-0 active:mb-0 w-[427px]'
        }
      >
        <div className="w-[86px] h-[86px] relative">
          <Image className="rounded-xl object-cover w-full h-full" alt="facility" src={img} width={86} height={86}/>
        </div>
        <div className="text-start self-center">
          <div className={textSizeClassName + 'font-semibold text-forest-b'}>{title}</div>
          <div className="text-forest-d text-xl mt-1">{category + ' • ' + status}</div>
        </div>
      </button>
      <div className="h-1"></div>
    </>
  );
}
