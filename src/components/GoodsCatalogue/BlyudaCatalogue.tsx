'use client'
import React, { useEffect, useMemo } from "react";
import cls from "./GoodsCatalogue.module.scss";
import Sorts from "../Sorts";
import { FilterBlockMore } from "./FilterBlock/FilterBlockMore";
import { BlyudaCategories } from "./BlyudaCategories";
import { RestaurantBunner } from "./RestaurantBunner";
import { GoodsTitleCategories } from "./GoodsTitleCategories";
import { DeashBlock } from "./GoodsBlock/DeashBlock";
import Skeleton from "./GoodsBlock/Skeleton";
import NotFoundBlock from "../NotFoundBlock";
import { Pagination } from "../Pagination";
import { COUNT_PER_PAGE } from "../Pagination/pagination-lib";
import { useLateEffect } from "../../hooks/useLateEffect";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import Breadcrumb from '@/components/ui/breadcrumb';
import { useStore } from "@/hooks/useStore";
import { ISiteCategory } from "@/settings/site-path-cathegory";
import {observer} from "mobx-react";
import {arrayToString, isEntryArray} from "@/api/Product/ProductService";

export interface ICatalogCategories {
  sitePathCategory?: ISiteCategory;
}


export const BlyudaCatalogue: React.FC<ICatalogCategories> = observer(({ sitePathCategory }) => {

  const store = useStore();
  const productStore = store.product;
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  // const [getProducts, { isLoading }] = useGetProductsMuseEffectutation();
  const searchParams = useSearchParams();
  const filterRout = useRouter();
  const pathname = usePathname();

  const sort = productStore.sort;
  const filters = productStore.filters;

  const searchMinLamp = searchParams.get('MinLampCount');
  const parsedMinLamp = !isNaN(parseInt(searchMinLamp || '')) ? parseInt(searchMinLamp || '') : 0;
  const searchMaxLamp = searchParams.get('MaxLampCount');
  const parsedMaxLamp = !isNaN(parseInt(searchMaxLamp || '')) ? parseInt(searchMaxLamp || '') : 20;
  const searchMinMaxLamp = {
    min: parsedMinLamp,
    max: parsedMaxLamp
  };

  const searchMinDiam = searchParams.get('MinDiameter');
  const parsedMinDiam = !isNaN(parseInt(searchMinDiam || '')) ? parseInt(searchMinDiam || '') : 0;
  const searchMaxDiam = searchParams.get('MaxDiameter');
  const parsedMaxDiam = !isNaN(parseInt(searchMaxDiam || '')) ? parseInt(searchMaxDiam || '') : 2000;
  const searchMinMaxDiam = {
    min: parsedMinDiam,
    max: parsedMaxDiam
  };

  const searchMinHeight = searchParams.get('MinHeight');
  const parsedMinHeight = !isNaN(parseInt(searchMinHeight || '')) ? parseInt(searchMinHeight || '') : 0;
  const searchMaxHeight = searchParams.get('MaxHeight');
  const parsedMaxHeight = !isNaN(parseInt(searchMaxHeight || '')) ? parseInt(searchMaxHeight || '') : 2000;
  const searchMinMaxHeight = {
    min: parsedMinHeight,
    max: parsedMaxHeight
  };

  const searchMinWidth = searchParams.get('MinWidth');
  const parsedMinWidth = !isNaN(parseInt(searchMinWidth || '')) ? parseInt(searchMinWidth || '') : 0;
  const searchMaxWidth = searchParams.get('MaxWidth');
  const parsedMaxWidth = !isNaN(parseInt(searchMaxWidth || '')) ? parseInt(searchMaxWidth || '') : 1500;
  const searchMinMaxWidth = {
    min: parsedMinWidth,
    max: parsedMaxWidth
  };

  const searchMinLength = searchParams.get('MinLength');
  const parsedMinLength = !isNaN(parseInt(searchMinLength || '')) ? parseInt(searchMinLength || '') : 0;
  const searchMaxLength = searchParams.get('MaxLength');
  const parsedMaxLength = !isNaN(parseInt(searchMaxLength || '')) ? parseInt(searchMaxLength || '') : 2000;
  const searchMinMaxLength = {
    min: parsedMinLength,
    max: parsedMaxLength
  };

  const searchMinIndent = searchParams.get('MinIndent');
  const parsedMinIndent = !isNaN(parseInt(searchMinIndent || '')) ? parseInt(searchMinIndent || '') : 0;
  const searchMaxIndent = searchParams.get('MaxIndent');
  const parsedMaxIndent = !isNaN(parseInt(searchMaxIndent || '')) ? parseInt(searchMaxIndent || '') : 1500;
  const searchMinMaxIndent = {
    min: parsedMinIndent,
    max: parsedMaxIndent
  };

  const searchMinPrice = searchParams.get('MinPrice');
  const parsedMinPrice = !isNaN(parseInt(searchMinPrice || '')) ? parseInt(searchMinPrice || '') : 0;
  const searchMaxPrice = searchParams.get('MaxPrice');
  const parsedMaxPrice = !isNaN(parseInt(searchMaxPrice || '')) ? parseInt(searchMaxPrice || '') : 250000;
  const searchMinMaxPrice = {
    min: parsedMinPrice,
    max: parsedMaxPrice
  };

  const searchProductTypesAr = searchParams.getAll('ProductTypes');
  const searchCategoriesAr = searchParams.getAll('Categories');
  const searchAdditionalParamsAr = searchParams.getAll('AdditionalParams');
  const searchPictureMaterialAr = searchParams.getAll('PictureMaterial');
  const searchMaterialsAr = searchParams.getAll('Materials');
  const searchStylesAr = searchParams.getAll('Styles');
  const searchColorsAr = searchParams.getAll('Colors');
  const searchChandTypesAr = searchParams.getAll('ChandelierTypes');


  const ProductTypesArray: number[] = searchProductTypesAr ? searchProductTypesAr.map(Number) : [];
  const CategoriesArray: number[] = searchCategoriesAr ? searchCategoriesAr.map(Number) : [];
  const AdditionalParamsArray: number[] = searchAdditionalParamsAr ? searchAdditionalParamsAr.map(Number) : [];
  const PictureMaterialArray: number[] = searchPictureMaterialAr ? searchPictureMaterialAr.map(Number) : [];
  const MaterialsArray: number[] = searchMaterialsAr ? searchMaterialsAr.map(Number) : [];
  const StylesArray: number[] = searchStylesAr ? searchStylesAr.map(Number) : [];
  const colorsArray: number[] = searchColorsAr ? searchColorsAr.map(Number) : [];
  const chandelierTypesArray: number[] = searchChandTypesAr ? searchChandTypesAr.map(Number) : [];
  const searchIsSale = searchParams.get('IsSale');
  const parsedSearchIsSale = searchIsSale === 'false' ? false : searchIsSale === 'true' ? true : false;
  const searchPage = searchParams.get('Page');

  const requestParams = {
    ...(ProductTypesArray !== undefined && ProductTypesArray.length > 0 && { ProductTypes: ProductTypesArray }),
    ...(CategoriesArray !== undefined && CategoriesArray.length > 0 && { Categories: CategoriesArray }),
    ...(StylesArray !== undefined && StylesArray.length > 0 && { Styles: StylesArray }),
    ...(AdditionalParamsArray !== undefined && AdditionalParamsArray.length > 0 && { AdditionalParams: AdditionalParamsArray }),
    ...(PictureMaterialArray !== undefined && PictureMaterialArray.length > 0 && { PictureMaterial: PictureMaterialArray }),
    ...(MaterialsArray !== undefined && MaterialsArray.length > 0 && { Materials: MaterialsArray }),
    ...(colorsArray !== undefined && colorsArray.length > 0 && { Colors: colorsArray }),
    ...(chandelierTypesArray !== undefined && chandelierTypesArray.length > 0 && { ChandelierTypes: chandelierTypesArray }),
    ...(searchMinDiam !== null && { MinDiameter: parsedMinDiam }),
    ...(searchMaxDiam !== null && { MaxDiameter: parsedMaxDiam }),

    ...(searchMinLamp !== null && { MinLampCount: parsedMinLamp }),
    ...(searchMaxLamp !== null && { MaxLampCount: parsedMaxLamp }),

    ...(searchMinHeight !== null && { MinHeight: parsedMinHeight }),
    ...(searchMaxHeight !== null && { MaxHeight: parsedMaxHeight }),

    ...(searchMinWidth !== null && { MinWidth: parsedMinWidth }),
    ...(searchMaxWidth !== null && { MaxWidth: parsedMaxWidth }),

    ...(searchMinLength !== null && { MinLength: parsedMinLength }),
    ...(searchMaxLength !== null && { MaxLength: parsedMaxLength }),

    ...(searchMinIndent !== null && { MinIndent: parsedMinIndent }),
    ...(searchMaxIndent !== null && { MaxIndent: parsedMaxIndent }),

    ...(searchMinPrice !== null && { MinPrice: parsedMinPrice }),
    ...(searchMaxPrice !== null && { MaxPrice: parsedMaxPrice }),

    ...(parsedSearchIsSale !== null && parsedSearchIsSale !== false && { IsSale: parsedSearchIsSale }),
    SortType: sort,
    // From: +(searchPage || 0) * COUNT_PER_PAGE,
  };

  useEffect(() => {
      productStore.getProducts(COUNT_PER_PAGE, page * COUNT_PER_PAGE,requestParams)
      .then(() => window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
    );
  }, [productStore.filters, searchPage, sort, page]);

  useEffect(() => {
    CategoriesArray.map((category) => {
      productStore.setCategories(category - 1);
    })

    ProductTypesArray.map((productType) => {
      productStore.setProductTypes(productType - 1);
    })

  //@ts-ignore
    setPage(searchParams.get(`Page`) === null ? 0 : +searchParams.get(`Page`))
  }, []);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(`Page`, page.toString())
    router.push(`${pathname}?${newParams.toString()}`)
  }, [page]);








  

  const products = productStore.items;
  const productsCount = productStore.totalCount;

  const skeleton = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const [isActive, setIsActive] = React.useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };

  const NotshouldDisplayFilterBlock =
    pathname === "/ProductiOnline";
    
    // useEffect(() => {                                    //ДОРАБОТАТЬ ФУНКЦИЮ так, чтобы если у нас мы находимся на странице http://localhost:3000/ProductiOnline , то нас перенаправляло в http://localhost:3000/ProductiOnline?ProductTypes=1 и в нетворке это отображалось
    //   // Проверка условия и перенаправление
    //   if (pathname === "/ProductiOnline" && !searchProductTypesAr.includes('1')) {
    //     const newParams = new URLSearchParams(searchParams.toString());
    //     newParams.set('ProductTypes', '1');
    //     router.push(`${pathname}?${newParams.toString()}`);
    //   }
    // }, [pathname, searchParams, searchProductTypesAr, router]);

  const NotshouldDisplayFilterBlockAccess =
    pathname === "/Restaurant/IkraKrasnaya" ||
    pathname === "/Restaurant/IkraChernaya" ||
    pathname === "/Restaurant/IkraShuchya" ||
    pathname === "/Restaurant/KrabiILobsteri" ||
    pathname === "/Restaurant/KrevetkiILangustini" ||
    pathname === "/Restaurant/Moreproducti" ||
    pathname === "/Restaurant/RibaSvejomorojennaya" ||
    pathname === "/Restaurant/RibaOxlojdennaya" ||
    pathname === "/Restaurant/SteikiIFile" ||
    pathname === "/Restaurant/RibaVyalennaya" ||
    pathname === "/Restaurant/Polufabrikati" ||
    pathname === "/Restaurant/KonserviIPreservi";


  return (
    <>
      <div className={cls.chapter__mt_bread}>
        <Breadcrumb />
      </div>
      <section className={cls.section_catalogue}>
        <RestaurantBunner />
        <BlyudaCategories ProductTypesArray={ProductTypesArray} CategoriesArray={CategoriesArray} sitePathCategory={sitePathCategory} />
        <div className={`${cls.catalogue__container} ${cls.catalogue__container_s} ${cls.container}`}>

          <div className={`${cls.catalogue__product} ${cls.catalogue__product_s} ${NotshouldDisplayFilterBlockAccess && cls.fullWidth}`}>
            <div className={cls.catalogue__product_filsort}>
            </div>
              <h3 className={cls.allproduct_headingsafvs}>
                Доставка еды из ресторана &apos;МорскойКоктейль&apos;
              </h3>
              <span className={cls.allproduct_headinsgegw}>
                +7(999) 999-99-99
              </span>
            <ul className={cls.allproduct_goods_list}>
              {products.map((product) => (
                <DeashBlock key={product.id} product={product} />
              ))}
            </ul>
          </div>
        </div>
        {(productsCount ?? 0) >= COUNT_PER_PAGE && (
         <Pagination
           count={productsCount}
           changePage={(num: number) => setPage(num - 1)}
           isLoading={productStore.isLoading}
         />
        )}
      </section>
    </>
  );
});