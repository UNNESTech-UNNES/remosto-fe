'use client';

import Image from 'next/image';
import { Button } from '@/components/button';
import { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useRouter } from 'next/navigation';
import { submitAndResetNavigationTracker } from '@/utils/use-navigation-tracker';

export function SessionModal({ standbyTime = 20_000, terminateSessionAfter = 10_000 }) {
  const router = useRouter();
  const timeout = standbyTime + terminateSessionAfter;

  const [isOpen, setIsOpen] = useState(false);
  const [remaining, setRemaining] = useState(timeout);

  const onIdle = async () => {
    await submitAndResetNavigationTracker();
    router.push('/');
  };

  const { getRemainingTime } = useIdleTimer({
    timeout: timeout,
    throttle: 500,
    onIdle,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime()));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    if (remaining <= terminateSessionAfter) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [remaining, terminateSessionAfter]);

  if (!isOpen) {
    return;
  }

  return (
    <div
      id="popup"
      className="h-screen w-full bg-black bg-opacity-40 fixed top-0 z-20 justify-center flex"
    >
      <div className="flex justify-center pt-[180px] fixed z-40">
        <Image
          className="flex justify-center"
          alt="ok"
          src="/assets/images/emoji-sad.svg"
          width={198}
          height={238}
        />
      </div>
      <div className="bg-gradient-2 shadow-[0px_8px_0px_0px] shadow-forest-b w-[550px] py-16 top-[288px] fixed z-30 flex justify-center items-center rounded-3xl">
        <div className="w-[365px] h-fit pt-8 flex flex-col items-center justify-center">
          <div className="text-forest-b font-semibold text-5xl text-center self-center pt-12 pb-12">
            Halloo.. Kamu masih disana?
          </div>
          <Button text="Tutup" variant="dark" />
        </div>
      </div>
    </div>
  );
}
