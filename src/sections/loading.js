'use client';

import { useEffect, useState } from 'react';
import Footer from '@/components/footer';
import LoadingFrame from 'public/assets/images/loading-frame.svg';

export function Loading({ withFooter = false, footerProps }) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    type();
  }, []);

  async function type() {
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    while (true) {
      setDots('');
      await timer(1000);
      setDots('.');
      await timer(1000);
      setDots('..');
      await timer(1000);
      setDots('...');
      await timer(1000);
    }
  }

  return (
    <>
      <section className="w-full h-screen bg-forest-f grid place-items-center">
        <div className="grid place-items-center pb-8">
          <div className="relative w-fit h-fit overflow-hidden">
            <div className="relative z-30 w-full h-full ">
              <LoadingFrame className="w-full h-full" />
            </div>
            <div className="absolute top-0 bg-forest-c w-full h-full z-20 animate-loading-page ease-in scale-90"></div>
            <div className="absolute top-0 bg-forest-e w-full h-full z-10 scale-90"></div>
          </div>
          <div className="mt-8 w-[335px] text-left text-3xl text-forest-c font-semibold">
            Tunggu Sebentar Ya{dots}
          </div>
        </div>
      </section>
      {withFooter && <Footer {...footerProps} />}
    </>
  );
}
