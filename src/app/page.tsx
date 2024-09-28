// "use client"
// import Image from "next/image";

// export default function Home() {
//   return (
//     <main>
//     </main>
//   );
// }


// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//       const router = useRouter();

//       // useEffect(() => {
//       //   router.push("/Home");
//       // }, []);

//       return <></>;
// }

"use client"

import React, {useEffect} from "react";
import YandexMap from './Home/YandexMap/YandexMap';
import { useModalAction } from '../components/common/modal/modal.context';
import { SectionHero } from "./Home/SectionHero/SectionHero";
import { SectionChoise } from './Home/SectionChoise/SectionChoise';


const Home: React.FC = () => {

  const { closeModal, openModal } = useModalAction();

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("isFirstVisit");
    if (!isFirstVisit) {
      localStorage.setItem("isFirstVisit", "true");
      setTimeout(() => {
        openModal("SUCCESS_CHANGE_PASSWORD");
      }, 1000);
    }
  }, [openModal]);

  return (
    <React.Fragment>
      <SectionHero />
      <SectionChoise />
      <YandexMap />
    </React.Fragment>
  );
};

export default Home;