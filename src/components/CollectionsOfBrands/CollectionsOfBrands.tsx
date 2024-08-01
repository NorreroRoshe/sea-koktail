"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import cls from './CollectionsOfBrands.module.scss';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useStore } from '@/hooks/useStore';
import {observer} from "mobx-react";

export const CollectionsOfBrands: React.FC = observer(() => {


  const store = useStore();
  const brandStore = store.brand;

  const pathname = usePathname();
  const brandId = pathname.split('/').pop();

  const brand = brandStore.brands.find((br) => br.id === brandId);

  useEffect(() => {
      brandStore.getBrandCol({
        BrandId: brandId,
        Count: 100,
      });
  }, [brandId, brand]);

  return (
    <section className={cls.section_product}>
      <h2 className={cls.brand__title}>Коллекции бренда {brandStore?.brandName}</h2>
      <div className={cls.mb50}></div>
      <div className={`${cls.container} ${cls.product__container}`}>
        {/* <h2 className={cls.product_heading}>{title}</h2> */}
        <div className={cls.product__categories}>
          {brandStore?.brandCollection?.map((collections) => (
            <Link
              href={`/Collections/${collections.id}`}
              key={collections.id}
              className={cls.product__categories_item}>
              <span className={cls.product__categories_link}>
                <img
                  src={collections.preview ?? 'default_image_url'}
                  className={cls.product__categories_img}
                />
                <p className={cls.product__categories_description}>{collections.name}</p>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});
