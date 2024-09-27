"use client"

import React, {useEffect} from "react";

import { SectionHero } from "./SectionHero/SectionHero";
import { Partnership } from "../../components/Partnership/Partnership";
import { LightCatalogue } from "../../components/LightCatalogue/LightCatalogue";

import { SaleBunner } from "./SaleBunner/SaleBunner";
import Container from '@/components/ui/container';
import { PreFooter } from './PreFooter/PreFooter';
import CategoryGridBlock from '@/components/common/category-grid-block';
import { SectionFoppa } from './SectionFoppa/SectionFoppa';
import YandexMap from './YandexMap/YandexMap';
import { useModalAction } from '../../components/common/modal/modal.context';
import { MirrorAdvertisement } from './MirrorAdvertisement/MirrorAdvertisement';
import { SectionChoise } from './SectionChoise/SectionChoise';



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
    <div className="wrapp">
      {/* <button         //Signin Данилы
        onClick={() =>
          signIn({
            email: "lightninhg-shop@outlook.com",
            password: "Cefd-21avt-pdc",
            rememberMe: true,
          })
        }
      >
        Sign in
      </button> */}
      <SectionHero />
      <SectionChoise />
      {/* <Container>
        <CategoryGridBlock />
      </Container> */}
      {/* <LightCatalogue /> */}
      {/* <SaleBunner /> */}
      <YandexMap />
      {/* <Partnership /> */}
      {/* <SectionFoppa /> */}
      {/* <MirrorAdvertisement /> */}
      {/* <PreFooter /> */}
    </div>
  );
};

export default Home;