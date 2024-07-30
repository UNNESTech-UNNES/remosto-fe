'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/button';
import ArrowLeftIcon from '/public/assets/icons/back.svg';
import HomeIcon from '/public/assets/icons/home.svg';
import SoundOnIcon from '/public/assets/icons/sound.svg';
import SoundOffIcon from '/public/assets/icons/sound-off.svg';
import FeedbackIcon from '/public/assets/icons/feedback.svg';
import { useState } from 'react';

export default function Footer({ sound = false, feedback = false }) {
  const router = useRouter();

  const pathname = usePathname();
  const feedbackPathCategory = pathname.split('/')[1];

  const [isPlay, setisPlay] = useState(false);

  return (
    <>
      <Image
        className="fixed bottom-0 z-30 pointer-events-none"
        alt="footer grass"
        src={'/assets/images/footer-grass.svg'}
        width={1920}
        height={237}
      />
      <div>
        <div className="rounded-t-[99px] bg-gradient-1 fixed bottom-0 z-50 w-full h-[120px] border-t-[6px] border-forest-b inline-flex gap-4 justify-center items-center">
          <Button
            text="Kembali Sebelumnya"
            variant="brown"
            onClick={() => router.back()}
            icon={<ArrowLeftIcon />}
            iconPosition="left"
          />
          {feedback && (
            <Button
              text="Beri Feedback"
              variant="brown"
              onClick={() => router.push(`/${feedbackPathCategory}/feedback`)}
              icon={<FeedbackIcon />}
              iconPosition="left"
            />
          )}
          <Button
            text="Ke Menu Utama"
            variant="brown"
            onClick={() => router.push('/')}
            icon={<HomeIcon />}
            iconPosition="left"
          />
          {sound && (
            <Button
              variant="brown"
              icon={isPlay ? <SoundOffIcon /> : <SoundOnIcon />}
              onClick={() => setisPlay((state) => !state)}
              iconOnly
            />
          )}
        </div>
      </div>
    </>
  );
}
