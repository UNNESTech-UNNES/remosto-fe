'use client';

import Footer from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SessionModal } from '@/components/session-modal';
import { Button } from '@/components/button';
import HomeIcon from 'public/assets/icons/home.svg';
import PlaneIcon from 'public/assets/icons/plane.svg';
import { submitAndResetNavigationTracker } from '@/utils/use-navigation-tracker';
import { insertFeedback } from '@/services/feedback';

let isPopup = false;

export default function Feedback({ section = null, categories }) {
  const [popup, setPopup] = useState(isPopup);

  async function handleFormSubmit(event) {
    const categories = Array.from(
      event.target.querySelectorAll('input[name="feedback"]:checked'),
      (feedback) => feedback.value,
    );

    insertFeedback({
      section: section,
      star: Number(event.target.rating.value),
      categories: String(categories.length === 0 ? 'Lainnya' : categories),
      desc: String(event.target.description.value),
    })
      .then((response) => {
        console.log('success');
      })
      .catch((error) => {
        console.log('error');
      });
  }

  return (
    <main className="min-h-screen bg-forest-f pb-72 ">
      {popup && <FeedbackPopup />}
      <div className="px-[610.5px]">
        <Title text="Berikan Feedback" />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleFormSubmit(event);
            submitAndResetNavigationTracker();
            setPopup(true);
          }}
        >
          <EmoteCard />
          <FeedbackCard categories={categories} />
          <SuggestionForm />
          <Button
            type="submit"
            text="Kirim Feedback"
            icon={<PlaneIcon />}
            iconPosition="right"
            variant="dark"
            fullWidth
          />
        </form>
      </div>
      <Footer />
      <SessionModal />
    </main>
  );
}

function Title({ text }) {
  return (
    <div className="text-center w-full text-[40px] font-bold text-forest-c py-[90px]">{text}</div>
  );
}

function EmoteRadioButton({ value, src, defaultChecked = false }) {
  return (
    <div className="">
      <input
        className="hidden peer"
        id={'rating' + value}
        type="radio"
        name="rating"
        value={value}
        defaultChecked={defaultChecked}
      />
      <label
        className="flex justify-center grayscale mix-blend-multiply peer-checked:grayscale-0 peer-checked:mix-blend-normal peer-checked:scale-125 w-[84px] h-[84px] border-forest-d rounded-full"
        htmlFor={'rating' + value}
      >
        <Image alt="very bad" src={src} height={67.814} width={81} />
      </label>
      <br></br>
    </div>
  );
}

function EmoteCard() {
  return (
    <div className="bg-forest-g py-12 px-[55px] text-forest-a w-[699px] shadow-[0px_8px_0px_0px] shadow-black/20 rounded-3xl mb-6">
      <div className="font-semibold mb-8 text-center text-3xl">
        Bagaimana perasaanmu tentang informasi yang kami berikan?
      </div>
      <div className="w-full justify-center gap-5 flex">
        <EmoteRadioButton value={1} src="/assets/images/feedback-very-bad.svg" />
        <EmoteRadioButton value={2} src="/assets/images/feedback-bad.svg" />
        <EmoteRadioButton
          value={3}
          src="/assets/images/feedback-neutral.svg"
          defaultChecked={true}
        />
        <EmoteRadioButton value={4} src="/assets/images/feedback-good.svg" />
        <EmoteRadioButton value={5} src="/assets/images/feedback-very-good.svg" />
      </div>
    </div>
  );
}

function FeedbackCheckbox({ value, text }) {
  return (
    <div className="flex">
      <input
        className="hidden peer"
        id={'feedback' + value}
        type="checkbox"
        name="feedback"
        value={text}
      />
      <label
        className="bg-forest-g py-[14px] px-7 text-forest-d border-forest-d border-[3px] rounded-[99px] peer-checked:text-white peer-checked:bg-forest-d"
        htmlFor={'feedback' + value}
      >
        {text}
      </label>
      <br></br>
    </div>
  );
}

function FeedbackCard({ categories = [] }) {
  return (
    <div className="bg-forest-g py-12 px-[55px] w-[699px] shadow-[0px_8px_0px_0px] shadow-black/20 rounded-3xl mb-6">
      <div className="font-semibold mb-8 text-center text-forest-a text-3xl">
        Apa yang perlu kami tingkatkan?
      </div>
      <div className="flex flex-wrap justify-center gap-[9px]">
        {categories.map((category, index) => (
          <FeedbackCheckbox key={index} value={index + 1} text={category} />
        ))}
      </div>
    </div>
  );
}

function SuggestionForm() {
  return (
    <div className="bg-forest-g py-12 px-[55px] w-[699px] shadow-[0px_8px_0px_0px] shadow-black/20 rounded-3xl mb-6">
      <div className="font-semibold mb-8 text-center text-forest-a text-3xl">
        Kami perlu kritik dan saran darimu
      </div>
      <textarea
        className="border-forest-d border-[3px] bg-white bg-opacity-5 w-full min-h-[341px] rounded-3xl text-forest-c p-4"
        id="suggestion"
        name="description"
        defaultValue=""
        required={true}
      />
    </div>
  );
}

function FeedbackPopup() {
  return (
    <div
      id="popup"
      className={'h-screen w-full bg-black bg-opacity-40 fixed z-20 justify-center flex'}
    >
      <div className="flex justify-center pt-[180px] fixed  z-40">
        <Image
          className="flex justify-center"
          alt="ok"
          src="/assets/images/emoji-star-eyes.svg"
          width={198}
          height={238}
        />
      </div>
      <div className="bg-gradient-2 shadow-[0px_8px_0px_0px] shadow-forest-b h-[500px] w-[550px] top-[288px] fixed z-30 flex justify-center items-center rounded-3xl">
        <div className="w-[365px] h-[290px] flex flex-col items-center">
          <div className="text-forest-b font-semibold text-5xl text-center self-center pt-12 pb-12">
            Terimakasih telah mengisi feedback!
          </div>
          <Link href="/">
            <Button text="Kembali ke Menu" icon={<HomeIcon />} iconPosition="left" variant="dark" />
          </Link>
        </div>
      </div>
    </div>
  );
}
