"use client"

import React from "react";
import cls from "./Brands.module.scss";
import { BrandsOfCollections } from "@/components/BrandsOfCollections/BrandsOfCollections";
import {observer} from "mobx-react";

const Brands: React.FC = observer(() => {
      return (
            <section className={cls.section_collections}>
                  <div className={`${cls.collections_container} ${cls.container}`}>
                        <h2 className={cls.collections_header}>Бренды</h2>
                        <BrandsOfCollections />
                  </div>
            </section>
      );
});

export default Brands;
