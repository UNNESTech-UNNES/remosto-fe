'use client';

import { Button } from '@/components/button';
import ArrowLeftIcon from '/public/assets/icons/back.svg';
import { useRouter } from 'next/navigation';
import { SessionModal } from '@/components/session-modal';
import { useState, useEffect } from 'react';
import { Loading } from '@/sections/loading';
import { ErrorFetch } from '@/components/error-fetch';
import { getYoutubeVideoId } from '@/utils/video';
import { getDetailPublicFacility } from '@/services/information';

export default function VideoPage({ params }) {
  const router = useRouter();
  const { id } = params;

  const [videoUrl, setVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getVideoUrl() {
      await getDetailPublicFacility({ id: id })
        .then((response) => {
          setVideoUrl(response?.data?.video);
          setIsLoading(false);
        })
        .catch(() => {
          setIsError(true);
        });
    }

    if (!isNaN(id)) {
      getVideoUrl();
    }
  }, [id]);

  if (isError) {
    return (
      <section className="w-full h-screen bg-forest-f">
        <ErrorFetch />
      </section>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="">
      <section className="h-screen">
        <iframe
          width="1920"
          height="1080"
          src={`https://www.youtube.com/embed/${getYoutubeVideoId(
            videoUrl,
          )}?si=TSb8FYSWPR_bsrip&amp;controls=0&rel=0&loop=1&autoplay=1&showinfo=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </section>
      <div className="fixed top-0 w-full h-20 pt-10 pl-8 bg-white-100">
        <Button
          text="Kembali Sebelumnya"
          variant="brown"
          onClick={() => router.back()}
          icon={<ArrowLeftIcon />}
          iconPosition="left"
        />
      </div>
      <div className="fixed bottom-0 w-full h-36 bg-white-100"></div>
      <SessionModal standbyTime={600_000} />
    </main>
  );
}
