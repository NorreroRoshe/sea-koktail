'use client'
import React, { useState, useEffect } from 'react';
import cls from './GoodsCatalogue.module.scss';
import {BlyudaCategoriesKonkret} from './BlyudaCategoriesKonkret';
import SectionHeader from '../common/section-header';
import { ISubcategory, ISiteCategory } from '@/settings/site-path-cathegory';
import Container from '@/components/ui/container';
import BundleTextCategory from '@/components/bundle/bundle-text-category';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from "@/hooks/useStore";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import {arrayToString, isEntryArray} from "@/api/Product/ProductService";

export interface ICatalogCategories {
  sitePathCategory?: ISiteCategory;
  ProductTypesArray: number[];
  CategoriesArray: number[];
}

export const BlyudaCategories: React.FC<ICatalogCategories> = ({ ProductTypesArray, CategoriesArray, sitePathCategory }) => {
  
  const store = useStore();
  const productStore = store.product;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    setIsWideScreen(window.innerWidth >= 1150)
  }, []) 

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1150);
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Detach the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isWideScreen) {
    return (
      <>
        <div className={cls.catalogCategoryCell}>
          <div className={cls.catalogCategoryCellLink}>
            <div className={cls.catalogCategory}>
              {sitePathCategory?.subcategories?.map((subcategory: ISubcategory, index: number) => (
                <div key={index} className={`${cls.catalogCategoryTitleWrapper} ${cls.catalogCategoryTitleWrappercevw}`}>
                  <BlyudaCategoriesKonkret ProductTypesArray={ProductTypesArray} CategoriesArray={CategoriesArray} subcategory={subcategory} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <div className={cls.catalogCategoryevdwds}>
        <BundleTextCategory
          data={sitePathCategory}
          ProductTypesArray={ProductTypesArray} CategoriesArray={CategoriesArray}
        />
      </div>
    );
  }
}