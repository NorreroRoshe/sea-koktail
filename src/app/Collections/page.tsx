"use client"
import React from "react";
import cls from "./Collections.module.scss";
import { TypeOfGoods } from "../../components/TypeOfGoods/TypeOfGoods";
import Breadcrumb from '@/components/ui/breadcrumb';
import NotFoundBlock from "@/components/NotFoundBlock";
import {observer} from "mobx-react";

const Collections: React.FC = observer(() => {
  return (
    <>
      <section className={cls.section_collections}>
        {/* <div className={`${cls.collections_container} ${cls.container}`}>
          <Breadcrumb />
          <NotFoundBlock />

        </div> */}
      </section>
    </>
  );

});

export default Collections;
