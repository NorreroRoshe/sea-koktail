'use client'
import React from 'react';
import cls from './GoodsCatalogue.module.scss';
import { ISubcategory, ISiteCategory } from '@/settings/site-path-cathegory';
import { useStore } from "@/hooks/useStore";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import {arrayToString, isEntryArray} from "@/api/Product/ProductService";

export interface ICatalogCategories {
  subcategory?: ISubcategory;
  ProductTypesArray: number[];
  CategoriesArray: number[];
}

export const BlyudaCategoriesKonkret: React.FC<ICatalogCategories> = ({ ProductTypesArray, CategoriesArray, subcategory }) => {

  const store = useStore();
  const productStore = store.product;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // const filters = { ProductTypes: [subcategory?.typese], Categories: [subcategory?.categor] };
  const filters = {
    ProductTypes: [subcategory?.typese].filter((type): type is number => type !== undefined),
    Categories: [subcategory?.categor].filter((category): category is number => category !== undefined)
  };
  const handleGetProducts = () => {
    productStore.getProducts(100, 0, filters);
    const newSearchParams =  filters && Object.entries(filters)
    .map((item) =>
       (item[0] === "ProductTypes" ||
        item[0] === "Categories") &&
      isEntryArray(item)
        ? arrayToString(item)
        : `${item[0]}=${item[1]}`
    ) 
    .join("&")?.replace('&&', '&')
    const sort_by = searchParams.get('sort_by');
    if(sort_by !== null) {
      router.push(`${pathname}?${newSearchParams}&sort_by=${sort_by}`)
    }else {
      router.push(`${pathname}?${newSearchParams}`)
    }
  };

  const isActive = (subcategory?.subName === "Холодные закуски" && 
                   ProductTypesArray.includes(1) && 
                   CategoriesArray.includes(1)) ||
                  (subcategory?.subName === "Горячие закуски" && 
                   ProductTypesArray.includes(1) && 
                   CategoriesArray.includes(2))||
                    (subcategory?.subName === "Салаты" && 
                     ProductTypesArray.includes(1) && 
                     CategoriesArray.includes(3))||
                     (subcategory?.subName === "Супы" && 
                      ProductTypesArray.includes(1) && 
                      CategoriesArray.includes(4))||
                      (subcategory?.subName === "Горячие блюда" && 
                       ProductTypesArray.includes(1) && 
                       CategoriesArray.includes(5))||
                       (subcategory?.subName === "Морепродукты" && 
                        ProductTypesArray.includes(1) && 
                        CategoriesArray.includes(6))||
                        (subcategory?.subName === "Роллы" && 
                         ProductTypesArray.includes(1) && 
                         CategoriesArray.includes(7))||
                         (subcategory?.subName === "Сэндвичи" && 
                          ProductTypesArray.includes(1) && 
                          CategoriesArray.includes(8));

  return (
    <>
      <h3 
        onClick={handleGetProducts} 
        className={`${cls.catalogCategoryTitle} ${isActive ? cls.catalogCategoryTitle_active : ''}`}
      >
        {subcategory?.subName}
      </h3>
    </>
  )
}
