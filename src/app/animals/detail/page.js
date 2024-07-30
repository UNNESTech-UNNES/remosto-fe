import Footer from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { SmallCard } from '@/components/card';
import { getAllAnimals, getRecomendationItem } from '@/services/animal';
import PlayIcon from 'public/assets/icons/play.svg';
import { SessionModal } from '@/components/session-modal';
import { Suspense } from 'react';
import { Loading } from '@/sections/loading';
import { Button } from '@/components/button';
import VoiceRecognition from '@/components/voice-recognition';

export default function Tentang() {
  return (
    <Suspense fallback={<Loading withFooter />}>
      <main className="min-h-screen bg-forest-f py-[90px] ">
        <Title text="Tentang Gembira Loka" />
        <div className="flex w-full justify-center gap-6 mb-[237px]">
          <div className="flex-none w-[496px] flex flex-col">
            <Link href="/animals/video">
              <div className="block w-[496.62px] h-[279px]">
                <Image
                  className="rounded-[32px]"
                  alt="thumbnail"
                  src="/assets/images/thumbnail-gembira-loka.png"
                  width={496.62}
                  height={279}
                />
                <div className="absolute top-[370px] left-[320px]">
                  <Button
                    variant="brown"
                    style={{ padding: 16 }}
                    iconOnly
                    icon={<PlayIcon className="scale-150" />}
                  />
                </div>
              </div>
            </Link>
            <InformasiLain />
          </div>
          <Sejarah title="Sejarah" />
        </div>
        <Footer feedback />
        <SessionModal />
        <VoiceRecognition />
      </main>
    </Suspense>
  );
}

function Title({ text }) {
  return (
    <div className="text-center w-full  text-[40px] font-bold text-forest-c flex justify-center mb-[90px]">
      {text}
    </div>
  );
}

function Sejarah({ title }) {
  const paragraphs = [
    'Pada saat proses pemindahan ibukota negara dari Yogyakarta kembali ke Jakarta di tahun 1949 setelah selesainya Perang Dunia II, tercetus lagi sebuah ide untuk memberikan kenang-kenangan kepada masyarakat Yogyakarta berupa sebuah tempat hiburan dari pemerintah pusat yang dipelopori oleh Januismadi dan Hadi, SH. Ide tersebut mendapat sambutan hangat dari masyarakat Yogyakarta, akan tetapi realisasinya masih belum dirasakan oleh masyarakat.',
    'Hingga di tahun 1953, dengan berdirinya Yayasan Gembira Loka Yogyakarta (sesuai akta notaris RM. Wiranto No. 11 tanggal 10 September 1953)yang diketuai oleh Sri Paduka KGPAA Paku Alam VIII, maka pembangunan Kebun Rojo yang tertunda baru benar-benar dapat direalisasikan.Selang beberapa tahun kemudian, tepatnya 1959, KGPAA Paku Alam VIII menunjuk Tirtowinoto untuk melanjutkan pembangunan Gembira Loka. Dipilihnya Tirtowinoto karena yang bersangkutan dinilai memiliki kecintaan terhadap alam dan minat yang besar terhadap perkembangan Gembira Loka. Ternyata sumbangsih Tirtowinoto yang tidak sedikit, baik dalam hal pemikiran maupun material, terbukti mampu membawa kemajuan yang pesat bagi Gembira Loka. Puncaknya di tahun 1978, ketika koleksi satwa yang dimiliki semakin lengkap, sehingga pengunjung Gembira Loka semakin meningkat.',
  ];
  return (
    <div className="flex flex-col bg-white w-[1186px] p-[46px] gap-8 rounded-2xl  ">
      <div className="text-forest-c font-bold text-[32px] ">{title}</div>
      <p className=" text-2xl text-black">
        Ide awal pembangunan Kebun Raya dan Kebun Binatang Gembira Loka berasal dari keinginan Sri
        Sultan Hamengku Buwono VIII pada tahun 1933 akan sebuah tempat hiburan, yang di kemudian
        hari dinamakan Kebun Rojo. Ide tersebut direalisasikan oleh Sri Sultan Hamengku Buwono IX
        dengan bantuan Ir. Karsten, seorang arsitekberkebangsaan Belanda. Ir. Karsten kemudian
        memilih lokasi disebelah barat sungai Winongo, karena dianggap sebagai tempat paling ideal
        untuk pembangunan Kebun Rojo tersebut. Namun akibat dampak Perang Dunia II dan juga
        pendudukan oleh Jepang, pembangunan Kebun Rojo terhenti.
      </p>
      <p className=" text-2xl text-black">
        Ide awal pembangunan Kebun Raya dan Kebun Binatang Gembira Loka berasal dari keinginan Sri
        Sultan Hamengku Buwono VIII pada tahun 1933 akan sebuah tempat hiburan, yang di kemudian
        hari dinamakan Kebun Rojo. Ide tersebut direalisasikan oleh Sri Sultan Hamengku Buwono IX
        dengan bantuan Ir. Karsten, seorang arsitekberkebangsaan Belanda. Ir. Karsten kemudian
        memilih lokasi disebelah barat sungai Winongo, karena dianggap sebagai tempat paling ideal
        untuk pembangunan Kebun Rojo tersebut. Namun akibat dampak Perang Dunia II dan juga
        pendudukan oleh Jepang, pembangunan Kebun Rojo terhenti.
      </p>
      <p className=" text-2xl text-black">
        Ide awal pembangunan Kebun Raya dan Kebun Binatang Gembira Loka berasal dari keinginan Sri
        Sultan Hamengku Buwono VIII pada tahun 1933 akan sebuah tempat hiburan, yang di kemudian
        hari dinamakan Kebun Rojo. Ide tersebut direalisasikan oleh Sri Sultan Hamengku Buwono IX
        dengan bantuan Ir. Karsten, seorang arsitekberkebangsaan Belanda. Ir. Karsten kemudian
        memilih lokasi disebelah barat sungai Winongo, karena dianggap sebagai tempat paling ideal
        untuk pembangunan Kebun Rojo tersebut. Namun akibat dampak Perang Dunia II dan juga
        pendudukan oleh Jepang, pembangunan Kebun Rojo terhenti.
      </p>
    </div>
  );
}

async function InformasiLain() {
  const { isSuccess, data: informasiLainnya } = await getAllAnimals({})
    .then((response) => ({
      isSuccess: true,
      data: response.data,
    }))
    .catch((error) => ({
      isSuccess: false,
      data: null,
    }));

  if (!isSuccess) {
    return;
  }

  const informasi = informasiLainnya.sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <div className="rounded-t-3xl rounded-b-3xl w-full mt-[60px] py-4 text-forest-c flex flex-col gap-10">
      <div className=" flex justify-between items-center w-full text-xl h-fit">
        <div className="text-2xl font-bold">Baca Juga</div>
        <Link href={'/animals/other'}>
          <div className="text-xl inline-flex h-fit active:underline">
            Lihat Semua
            <Image width={24} height={24} alt="all" src={'/assets/icons/navigate-next.svg'} />
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-6">
        {informasi.slice(0, 4).map((item, index) => (
          <Link key={index} href={`/animals/detail/${item.id}`}>
            <SmallCard
              title={item?.name || '-'}
              description={item?.animal_categories?.name || '-'}
              img={item?.image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
