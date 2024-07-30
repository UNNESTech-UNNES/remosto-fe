'use client';
import { useState } from 'react';
import { Button } from './button';

export default function productModal({ product }) {
  return (
    <button className='fixed w-screen h-screen bg-black bg-opacity-40'>
      <div className="bg-gradient-2 shadow-[0px_8px_0px_0px] shadow-forest-b w-[550px] py-16 top-[288px] fixed z-30 flex justify-center items-center rounded-3xl">
        <div className="w-[365px] h-fit pt-8 flex flex-col items-center justify-center">
          <div className="text-forest-b font-semibold text-5xl text-center self-center pt-12 pb-12">
            Halloo.. Kamu masih disana?
          </div>
        </div>
      </div>
    </button>
  );
}
