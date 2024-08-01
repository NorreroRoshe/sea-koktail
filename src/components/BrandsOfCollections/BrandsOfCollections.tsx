"use client"
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import cls from './BrandsOfCollections.module.scss';
import { useStore } from '@/hooks/useStore';
import {observer} from "mobx-react";

export const BrandsOfCollections: React.FC = observer(() => {

  const store = useStore();
  const brandStore = store.brand

  useEffect(() => {
    brandStore.getBrands({Count: 100})
  }, []);


  return (
    <section className={cls.section_product}>
      <div className={cls.mb50}></div>
      {/* {brandStore.isLoading && <div>Идет загрузка</div>}
      {brandStore.isError && <div>Ошибка</div>} */}
      <div className={`${cls.container} ${cls.product__container}`}>
        {/* <h2 className={cls.product_heading}>{title}</h2> */}
        <div className={cls.product__categories}>
          {brandStore?.brands.map((brand) => (
            <Link
              href={`/Brands/${brand.id}`}
              key={brand.id}
              className={cls.product__categories_item}>
              <span className={cls.product__categories_link}>
                <img
                  src={brand.file.url ?? 'default_image_url'}
                  className={cls.product__categories_img}
                />
                <p className={cls.product__categories_description}>{brand.name}</p>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});
