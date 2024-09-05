// 'use client'
// import React from 'react';
// import cls from './GoodsCatalogue.module.scss';
// import { ISubcategory, ISiteCategory } from '@/settings/site-path-cathegory';
// import { useStore } from "@/hooks/useStore";
// import { useRouter } from "next/navigation";
// import { usePathname, useSearchParams } from "next/navigation";
// import {arrayToString, isEntryArray} from "@/api/Product/ProductService";

// export interface ICatalogCategories {
//   subcategory?: ISubcategory;
//   ProductTypesArray: number[];
//   CategoriesArray: number[];
// }

// export const BlyudaCategoriesKonkret: React.FC<ICatalogCategories> = ({ ProductTypesArray, CategoriesArray, subcategory }) => {

//   const store = useStore();
//   const productStore = store.product;
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   // const filters = { ProductTypes: [subcategory?.typese], Categories: [subcategory?.categor] };
//   const filters = {
//     ProductTypes: [subcategory?.typese].filter((type): type is number => type !== undefined),
//     Categories: [subcategory?.categor].filter((category): category is number => category !== undefined)
//   };
//   const handleGetProducts = () => {
//     productStore.getProducts(100, 0, filters);
//     const newSearchParams =  filters && Object.entries(filters)
//     .map((item) =>
//        (item[0] === "ProductTypes" ||
//         item[0] === "Categories") &&
//       isEntryArray(item)
//         ? arrayToString(item)
//         : `${item[0]}=${item[1]}`
//     ) 
//     .join("&")?.replace('&&', '&')
//     const sort_by = searchParams.get('sort_by');
//     if(sort_by !== null) {
//       router.push(`${pathname}?${newSearchParams}&sort_by=${sort_by}`)
//     }else {
//       router.push(`${pathname}?${newSearchParams}`)
//     }
//   };

//   const isActive = 
//     (subcategory?.subName === "Закуски" && 
//     ProductTypesArray.includes(1) && 
//     CategoriesArray.includes(518)) ||
//     (subcategory?.subName === "Салаты" && 
//     ProductTypesArray.includes(1) && 
//     CategoriesArray.includes(519))||
//     (subcategory?.subName === "Супы" && 
//     ProductTypesArray.includes(1) && 
//     CategoriesArray.includes(4))||
//     (subcategory?.subName === "Горячее" && 
//     ProductTypesArray.includes(1) && 
//     CategoriesArray.includes(521))||
//     (subcategory?.subName === "Роллы" && 
//     ProductTypesArray.includes(1) && 
//     CategoriesArray.includes(513))||
//     (subcategory?.subName === "Теплые роллы" && 
//     ProductTypesArray.includes(1) && 
//     CategoriesArray.includes(514))||
//     (subcategory?.subName === "Суши" && 
//     ProductTypesArray.includes(1) && 
//     CategoriesArray.includes(515))||
//     (subcategory?.subName === "Сашими" && 
//     ProductTypesArray.includes(1) && 
//     CategoriesArray.includes(516))||
//     (subcategory?.subName === "Витрина" && 
//     ProductTypesArray.includes(1) && 
//     CategoriesArray.includes(522))||
//     (subcategory?.subName === "Супы" && 
//     ProductTypesArray.includes(1) && 
//     CategoriesArray.includes(517))||
//     (subcategory?.subName === "Бургеры" && 
//     ProductTypesArray.includes(1) && 
//     CategoriesArray.includes(526))||
//     (subcategory?.subName === "Сэндвичи" && 
//     ProductTypesArray.includes(1) && 
//     CategoriesArray.includes(520));

//   return (
//     <>
//       <h3 
//         onClick={handleGetProducts} 
//         className={`${cls.catalogCategoryTitle} ${isActive ? cls.catalogCategoryTitle_active : ''}`}
//       >
//         {subcategory?.subName}
//       </h3>
//     </>
//   )
// }




'use client'
import React from 'react';
import cls from './GoodsCatalogue.module.scss';
import { ISubcategory } from '@/settings/site-path-cathegory';
import { useStore } from "@/hooks/useStore";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { arrayToString, isEntryArray } from "@/api/Product/ProductService";
import { COUNT_PER_PAGE } from "../Pagination/pagination-lib";

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

  const filters = {
    ProductTypes: [subcategory?.typese].filter((type): type is number => type !== undefined),
    Categories: [subcategory?.categor].filter((category): category is number => category !== undefined)
  };

  const handleGetProducts = () => {
    productStore.getProducts(COUNT_PER_PAGE, 0, filters);
    const newSearchParams = filters && Object.entries(filters)
      .map((item) =>
        (item[0] === "ProductTypes" || item[0] === "Categories") && isEntryArray(item)
          ? arrayToString(item)
          : `${item[0]}=${item[1]}`
      )
      .join("&")?.replace('&&', '&');

    const sort_by = searchParams.get('sort_by');
    if (sort_by !== null) {
      router.push(`${pathname}?${newSearchParams}&sort_by=${sort_by}`);
    } else {
      router.push(`${pathname}?${newSearchParams}`);
    }

    // Перемещаем скролл после обновления URL
    setTimeout(() => {
      window.scrollTo(0, 600);
    }, 150);
  };

  const isActive =
  //Продукты
  (subcategory?.subName === "Все продукты" && ProductTypesArray.includes(2) && CategoriesArray.length === 0) ||
    (subcategory?.subName === "Икра красная" && ProductTypesArray.includes(2) && CategoriesArray.includes(20)) ||
    (subcategory?.subName === "Икра черная" && ProductTypesArray.includes(2) && CategoriesArray.includes(19)) ||
    (subcategory?.subName === "Крабы и лобстеры" && ProductTypesArray.includes(2) && CategoriesArray.includes(73)) ||
    (subcategory?.subName === "Креветки и лангустины" && ProductTypesArray.includes(2) && CategoriesArray.includes(49)) ||
    (subcategory?.subName === "Морские деликатесы" && ProductTypesArray.includes(2) && CategoriesArray.includes(88)) ||
    (subcategory?.subName === "Рыба" && ProductTypesArray.includes(2) && CategoriesArray.includes(134)) ||
    (subcategory?.subName === "Живые морепродукты" && ProductTypesArray.includes(2) && CategoriesArray.includes(146)) ||
    (subcategory?.subName === "Стейки и филе" && ProductTypesArray.includes(2) && CategoriesArray.includes(109)) ||
    (subcategory?.subName === "Рыба вяленая, солёная и копченая" && ProductTypesArray.includes(2) && CategoriesArray.includes(152)) ||
    (subcategory?.subName === "Полуфабрикаты" && ProductTypesArray.includes(2) && CategoriesArray.includes(332)) ||
    (subcategory?.subName === "Консервы и пресервы" && ProductTypesArray.includes(2) && CategoriesArray.includes(41)) ||
    (subcategory?.subName === "Снеки" && ProductTypesArray.includes(2) && CategoriesArray.includes(209)) ||
    (subcategory?.subName === "Соусы" && ProductTypesArray.includes(2) && CategoriesArray.includes(223)) ||
    (subcategory?.subName === "Напитки" && ProductTypesArray.includes(2) && CategoriesArray.includes(483)) ||
    (subcategory?.subName === "Вода" && ProductTypesArray.includes(2) && CategoriesArray.includes(498)) ||
  //Блюда
    (subcategory?.subName === "Закуски" && ProductTypesArray.includes(1) && CategoriesArray.includes(518)) ||
    (subcategory?.subName === "Салаты" && ProductTypesArray.includes(1) && CategoriesArray.includes(519)) ||
    (subcategory?.subName === "Супы" && ProductTypesArray.includes(1) && CategoriesArray.includes(4)) ||
    (subcategory?.subName === "Горячее" && ProductTypesArray.includes(1) && CategoriesArray.includes(521)) ||
    (subcategory?.subName === "Роллы" && ProductTypesArray.includes(1) && CategoriesArray.includes(513)) ||
    (subcategory?.subName === "Теплые роллы" && ProductTypesArray.includes(1) && CategoriesArray.includes(514)) ||
    (subcategory?.subName === "Суши" && ProductTypesArray.includes(1) && CategoriesArray.includes(515)) ||
    (subcategory?.subName === "Сашими" && ProductTypesArray.includes(1) && CategoriesArray.includes(516)) ||
    (subcategory?.subName === "Витрина" && ProductTypesArray.includes(1) && CategoriesArray.includes(522)) ||
    (subcategory?.subName === "Супы" && ProductTypesArray.includes(1) && CategoriesArray.includes(517)) ||
    (subcategory?.subName === "Бургеры" && ProductTypesArray.includes(1) && CategoriesArray.includes(526)) ||
    (subcategory?.subName === "Сэндвичи" && ProductTypesArray.includes(1) && CategoriesArray.includes(520));

  return (
    <>
      <h3
        onClick={handleGetProducts}
        className={`${cls.catalogCategoryTitle} ${isActive ? cls.catalogCategoryTitle_active : ''}`}
      >
        {subcategory?.subName}
      </h3>
    </>
  );
};
