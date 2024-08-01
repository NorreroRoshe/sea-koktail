'use client'

import React, { useRef, useEffect, useState } from "react";
import { Modal } from "../../../HoverWindow/HoverWindow";
import cls from "../Header.module.scss";
import { MenuCategoryChand } from "./MenuCategoryChand/MenuCategoryChand";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOutsideAlerter } from "@/hooks/useClickOutside";
import { useStore } from "@/hooks/useStore";

export const MouseOverModal: React.FC = () => {

  const store = useStore();
  const collectionStore = store.collection;

  const [isModal, setModal] = React.useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, []) 
  
  const onClose = () => setModal(false);

  const handleGetSearchProducts = () => {
    collectionStore.getWindowCollection({});
    setModal(true);
  };

  const collectRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(collectRef, () => setModal(false));

  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        setModal(false);
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div
      ref={collectRef}
      className={cls.header_low_item}
      onClick={() => {
        if (windowWidth <= 1250) {
          setModal(!isModal);
        }
      }}
      onMouseEnter={() => {
        if (windowWidth > 1250) {
          handleGetSearchProducts();
        }
      }}
      onMouseLeave={() => {
        if (windowWidth > 1250) {
          setModal(false);
        }
      }}
    >
      <button className={cls.low_item_btn}>
        <span className={cls.low_item_heading}>КОЛЛЕКЦИИ</span>
        <span className={cls.low_item_icon}></span>
      </button>
      <Modal
        visible={isModal}
        title="ghbdtn"
        content={<MenuCategoryChand setModal={setModal} />}
        onClose={onClose}
      />
    </div>
  );
};
