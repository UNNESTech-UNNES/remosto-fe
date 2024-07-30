'use client';

import Image from 'next/image';
import { Button } from '@/components/button';
import { FacilityCard } from '@/components/card';
import Footer from '@/components/footer';
import { ErrorFetch } from '@/components/error-fetch';
import { useState, useEffect, useRef, Suspense } from 'react';
import PlayIcon from 'public/assets/icons/play.svg';
import FoodIcon from 'public/assets/icons/food.svg';
import {
  getListInformations,
  getDetailInformation,
  getRecomendationInformation,
} from '@/services/information';
import { SessionModal } from '@/components/session-modal';
import { useGesture } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import VoiceRecognition from '@/components/voice-recognition';

export default function GLMaps() {
  const [information, setInformation] = useState([]);
  const [isSuccess, setIsSuccess] = useState(true);

  const [reccomendation, setRecomendation] = useState([]);

  const [detailSuccess, setDetailSuccess] = useState(false);
  const [showDetail, setShowDetail] = useState();
  const [showLocation, setShowLocation] = useState(false);
  const [detailId, setDetailId] = useState();
  const [detailType, setDetailType] = useState();
  const [detail, setDetail] = useState();

  const [searchKeyword, setSearchKeyword] = useState();

  const [zoom, setZoom] = useState(1);

  const searchParams = useSearchParams();
  const paramsId = searchParams.get('id');
  const paramsType = searchParams.get('type');

  const mapRef = useRef();
  const searchRef = useRef();
  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
  }));
  const mapStyle = {
    transform: `scale(${zoom})`,
    transformOrigin: 'top left',
    ...style,
  };
  useGesture(
    {
      onDrag: ({ pinching, cancel, offset: [x, y], ...rest }) => {
        if (pinching) return cancel();
        api.start({ x, y });
      },
      onPinch: ({ offset: [s, a] }) => {
        setZoom(s);
        return;
      },
      onContextMenu: () => {},
    },
    {
      target: mapRef,
      pinch: { scaleBounds: { min: 0.5, max: 3 }, rubberband: true },
    },
  );

  useEffect(() => {
    async function getDetail() {
      if (detailId !== null) {
        await getDetailInformation({ id: detailId, type: detailType })
          .then((response) => {
            setDetail(response.data);
            setDetailSuccess(true);
          })
          .catch((e) => {
            setDetailSuccess(false);
          });
      }
    }
    getDetail();
  }, [detailId, detailType]);

  const handleShowDetail = (type, id) => {
    if (detailId === id) {
      setDetailId(null);
      setShowDetail(null);
      setShowLocation(false);
    } else {
      setDetailId(id);
      setDetailType(type);
      setShowDetail(true);
      setShowLocation(false);
    }
  };

  const handleShowLocation = (locationStatus) => {
    if (locationStatus) {
      setShowLocation(false);
    } else {
      setShowLocation(true);
      setZoom(1.5);
    }
  };

  useEffect(() => {
    async function getInformation() {
      await getListInformations({ keywoard: searchKeyword })
        .then((response) => {
          setInformation(response.data);
          setIsSuccess(true);
        })
        .catch((e) => {
          setIsSuccess(false);
        });
    }
    getInformation();
  }, [searchKeyword]);

  useEffect(() => {
    async function getRecomendation() {
      await getRecomendationInformation()
        .then((response) => {
          setRecomendation(response);
          setIsSuccess(true);
        })
        .catch((e) => {
          setIsSuccess(false);
        });
    }
    getRecomendation();
  }, []);

  useEffect(() => {
    if (paramsId && paramsType) {
      handleShowDetail(paramsType, Number(paramsId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsId, paramsType]);

  function calculateOpenTime(open_time, close_time) {
    if (!open_time || !close_time) {
      return null
  }

    var open_hour = parseInt(open_time.split('.')[0]);
    var open_minute = parseInt(open_time.split('.')[1]);
    var close_hour = parseInt(close_time.split('.')[0]);
    var close_minute = parseInt(close_time.split('.')[1]);

    const currDate = new Date();
    const current_hour = currDate.getHours();
    const current_minute = currDate.getMinutes();

    if (
      (current_hour > open_hour || (current_hour == open_hour && current_minute >= open_minute)) &&
      (current_hour < close_hour || (current_hour == close_hour && current_minute <= close_minute))
    ) {
      return 'buka';
    } else {
      return 'tutup';
    }
  }

  if (!isSuccess) {
    return <ErrorFetch />;
  }

  return (
    <main className="h-screen bg-[#FDF8F2] flex scrollbar-hide">
      <div className="h-full w-full fixed bg-[#FDF8F2]"></div>

      {/* SIDEBAR */}
      <div className="bg-forest-g w-[523px] z-20 h-full fixed left-0 text-forest-b px-12">
        <div className="py-12 pb-6">
          <div className="text-forest-c font-bold text-4xl pb-12">Maps</div>
          <div className="flex gap-2">
            <input
              ref={searchRef}
              type="search"
              placeholder="Cari Tempat"
              className="flex-1 border-forest-b border-[3px] py-[10px] px-8 text-forest-c w-auto rounded-[99px] bg-forest-g max-w-[312px]"
            />
            <div className="flex-none">
              <Button
                variant="brown"
                text="Cari"
                onClick={() => setSearchKeyword(searchRef.current.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 absolute">
          <div className="mb-8 font-semibold text-2xl">Dekat Denganmu</div>
          <Suspense
            fallback={
              <p className="absolute flex justify-center self-center text-4xl font-bold">
                Mencari informasi...
              </p>
            }
          >
            <div className="h-[720px] pt-2 flex-col overflow-y-auto scrollbar-hide pb-32">
              {information.map((value, index) => (
                <div key={index} className="mb-4">
                  <FacilityCard
                    onClick={() => handleShowDetail(value.type, value.id)}
                    img={value?.image || '/assets/image/cockatoo.jpg'}
                    category={
                      value?.infrastructure?.name || value?.animal_categories?.name || 'store'
                    }
                    title={value?.name || 'title'}
                    status={value?.status || 'buka'}
                  />
                </div>
              ))}
            </div>
          </Suspense>
        </div>

        {showDetail && (
          <Detail
            id={detail?.id || 1}
            type={detail?.type || 'information'}
            img={detail?.image || '/assets/images/cockatoo.jpg'}
            title={detail?.name || 'Title'}
            category={detail?.infrastructure?.name || 'Category'}
            open={detail?.open || '08.00'}
            close={detail?.close || '16.00'}
            description={detail?.desc || '-'}
            handleButton1={() => {}}
            handleButton2={() => handleShowLocation(showLocation)}
            handleButton3={() => handleShowDetail(detail.value, detail.id)}
            storeType={detail?.store_type || 1}
          />
        )}

        <div className="flex top-[76%] gap-5 overflow-x-auto scrollbar-hide fixed w-[1397px] z-10 left-[533px] pr-[420px]">
          {reccomendation.map((value, index) => (
            <div key={index} className="pt-2">
              <FacilityCard
                onClick={() => handleShowDetail(value.type, value.id)}
                img={value?.image || '/assets/image/cockatoo.jpg'}
                category={
                  value?.infrastructure?.name || value?.animal_categories?.name || 'categories'
                }
                title={value?.name || 'title'}
                status={calculateOpenTime(value?.open_time, value?.close_time) || 'buka'}
                variant="yellow"
              />
            </div>
          ))}
        </div>
      </div>

      {/* MAP */}
      <div className="absolute top-0 overflow-scroll scrollbar-hide w-[1397px] h-[960px] left-[523px] flex justify-center snap-both snap-mandatory">
        <div className="flex justify-end fixed gap-6 mt-6 pr-8 w-[1397px] z-10">
          <button
            disabled={zoom >= 3 ? true : false}
            onClick={() => setZoom(zoom + 0.2)}
            className="rounded-lg py-2 px-4 bg-forest-c bg-opacity-40 font-bold text-forest-c text-4xl flex justify-center items-center disabled:text-opacity-50"
          >
            +
          </button>
          <button
            disabled={zoom <= 0.4 ? true : false}
            onClick={() => setZoom(zoom - 0.2)}
            className="rounded-lg py-2 px-4 bg-forest-c bg-opacity-40 font-bold text-forest-c text-4xl flex justify-center items-center disabled:text-opacity-50"
          >
            -
          </button>
        </div>
        <div
          className={
            `flex relative` +
            (showLocation &&
              (detail?.x < 960 ? ' left-96' : '') + (detail?.y < 560 ? ' bottom-96' : ''))
          }
        >
          <animated.div
            ref={mapRef}
            style={mapStyle}
            className={`w-[1114px] h-[781px] flex mb-6 z-0 self-center`}
          >
            {showDetail && showLocation && (
              <div
                style={{ left: detail?.x || 768, bottom: detail?.y || 383 }}
                className={`z-10 absolute snap-center`}
              >
                <Image src="/assets/icons/location.svg" alt="location" width={28} height={28} />
              </div>
            )}
            <Image
              className="top-0 left-0"
              alt="map"
              src={'/assets/images/denah-gl.svg'}
              fill={true}
            />
          </animated.div>
        </div>
      </div>
      <div className="z-40">
        <Footer feedback />
        <SessionModal />
      </div>
      <VoiceRecognition />
    </main>
  );
}

function Detail({
  type = 'information',
  id = 1,
  img,
  title,
  category,
  description,
  handleButton1 = () => {},
  handleButton2 = () => {},
  handleButton3 = () => {},
  open = 'open',
  close = 'close',
  storeType = 0,
}) {
  let icon, text;

  if (type === 'animal') {
    type = `animals`;
    icon = <PlayIcon />;
    text = 'Lihat Hewan';
  } else if (type === 'store') {
    if (storeType === 1) {
      type = `food-store`;
      icon = <FoodIcon />;
      text = 'Buka Menu';
    } else {
      type = 'public-facilities';
      icon = <PlayIcon />;
      text = 'Buka Toko';
    }
  } else {
    type = 'public-facilities';
    icon = <PlayIcon />;
    text = 'Cek Fasilitas';
  }

  return (
    <div className="left-[547px] w-[400px] h-auto bg-forest-g fixed z-20 px-8 py-10 top-6 text-forest-b border border-forest-g shadow-[0px_8px_0px_0px] shadow-[#B8B294] rounded-3xl">
      <div className="relative w-[336px] h-[190px] mb-4">
        <Image
          className="rounded-xl object-cover w-full h-full"
          width={400}
          height={200}
          alt="detail"
          src={img}
        />
      </div>
      <div>
        <div className="text-[32px] font-semibold mb-[5px]">{title}</div>
        <div className="text-forest-d text-[16px]">{category}</div>
        <div className="w-full my-4">{description.slice(0, 150) + '...'}</div>
        <div className="flex w-full gap-[14px] font-medium">
          <div className=" relative">
            <Image
              className="fill-forest-d"
              height={24}
              width={24}
              alt="icon"
              src={'/assets/icons/alarm-brown.svg'}
            />
          </div>

          <div className="flex justify-between w-full text-xl">
            <span>Jam Buka</span>
            <span className="text-forest-d">{`${open} - ${close}`}</span>
          </div>
        </div>
        <div className="flex w-full gap-[14px] mt-[10px] font-medium">
          <div className=" relative">
            <Image
              className="fill-forest-d"
              height={24}
              width={24}
              alt="icon"
              src={'/assets/icons/distance-brown.svg'}
            />
          </div>
          <div className="flex justify-between w-full text-xl">
            <span>Jarak dari sini</span>
            <span className="text-forest-d">5m</span>
          </div>
        </div>
        <div className="mt-[25px] flex-col grid gap-y-[14px]">
          {type && (
            <Link href={storeType === 2 ? `/${type}/detail/${id}?type=3` : `/${type}/detail/${id}`}>
              <Button
                onClick={handleButton1}
                text={text}
                icon={icon}
                variant="light"
                fullWidth={true}
              />
            </Link>
          )}
          <Button
            onClick={handleButton2}
            text="Tunjukkan Jalan"
            icon={<PlayIcon />}
            variant="dark"
            fullWidth={true}
          />
          <Button onClick={handleButton3} text="Tutup" variant="light" fullWidth={true} />
        </div>
      </div>
    </div>
  );
}
