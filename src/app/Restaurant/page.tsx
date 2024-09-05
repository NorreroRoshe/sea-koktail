"use client"
import React, { useEffect } from "react";
import { BlyudaCatalogue } from "../../components/GoodsCatalogue/BlyudaCatalogue";
import { sitePathCategory } from "@/settings/site-path-cathegory";
import cls from "./ProductiOnline.module.scss";
import ProductDownloadApps from '@/components/common/product-download-apps';
import {observer} from "mobx-react";

const ProductiOnline: React.FC = observer(() => {
  return (
    <>
      <div className={`${cls.container} ${cls.chapter__container}`}>
        <div className={cls.chapter__mt}>
          <BlyudaCatalogue sitePathCategory={sitePathCategory[7]} />
        </div>
      </div>
      <div style={{borderBottom: '1px solid #0c69c7'}}>
        <ProductDownloadApps />
      </div>
    </>
  );
});

export default ProductiOnline;
