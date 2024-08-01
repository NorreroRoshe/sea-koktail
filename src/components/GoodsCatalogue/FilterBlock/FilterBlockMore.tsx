'use client'
import React, { useEffect, useState } from "react";
import cls from "../GoodsCatalogue.module.scss";
import Colorcheckbox from "../../Checkbox/ColorCheckbox";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import TypeLight from "../../Checkbox/TypeLight";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import RangeComponent, { IMinMax } from "../../sliders/RangeComponent";
import Switch from '@/components/ui/switch';
import { ISiteCategory } from '@/settings/site-path-cathegory';
import { useStore } from "@/hooks/useStore";
import { observer } from "mobx-react";

export interface IRange {
  minValue: number;
  maxValue: number;
}

const PriceRange: IRange = {
  minValue: 0,
  maxValue: 250000,
};
export type FilterProps = {
  isActive: boolean;
  handleClick: () => void;
  handleGetProducts: () => void;
  sitePathCategory?: ISiteCategory;
};

export const FilterBlockMore: React.FC<FilterProps> = observer(
  ({ handleClick, isActive, handleGetProducts, sitePathCategory }) => {

    const store = useStore();
    const productStore = store.product

    const pathname = usePathname();
    const router = useRouter();

    const [isOpenLight, setOpenLight] = useState<boolean>(true);
    const [isOpenDop, setOpenDop] = useState<boolean>(true);
    const [isOpenColor, setOpenColor] = useState<boolean>(true);
    // const [getProducts, {}] = useGetProductsMutation();
    const [trigger, setTrigger] = useState(false);
    const searchParams = useSearchParams();
    const saleRout = useRouter();
    const currentParams = useSearchParams()
    const params = new URLSearchParams(currentParams);
    const handleSetPrice = (props: IMinMax) => {
      productStore.setPrice(props.min, props.max);
    };

    const handleSetLampsCount = (props: IMinMax) => {
      productStore.setLampCount(props.min, props.max);
    };

    const handleSetDiameter = (props: IMinMax) => {
      productStore.setDiameter(props.min, props.max);
    };

    const handleSetHeight = (props: IMinMax) => {
      productStore.setHeight(props.min, props.max);
    };

    const handleSetWidth = (props: IMinMax) => {
      productStore.setWidth(props.min, props.max);
    };

    const handleSetLength = (props: IMinMax) => {
      productStore.setLength(props.min, props.max);
    };

    const handleSetIndent = (props: IMinMax) => {
      productStore.setIndent(props.min, props.max);
    };


    const handleSetTypeProduct = (ind: number) => {
      productStore.setProductTypes(ind);
    };

    const handleSetCategories = (ind: number) => {
      productStore.setCategories(ind);
      // const searchParams =  productStore.filters && Object.entries(productStore.filters)
      // .map((item) =>
      //   (item[0] === "ProductTypes" ||
      //     item[0] === "Categories" ||
      //     item[0] === "Styles" ||
      //     item[0] === "ChandelierTypes" ||
      //     item[0] === "Colors" ||
      //     item[0] === "AdditionalParams" ||
      //     item[0] === "Materials" ||
      //     item[0] === "PictureMaterial") &&
      //   isEntryArray(item)
      //     ? arrayToString(item)
      //     : `${item[0]}=${item[1]}`
      // )
      // .join("&")

      // router.push(`${pathname}?${searchParams}`)
    };

    const handleSetTypeColors = (ind: number) => {
      productStore.setColors(ind);
    };

    const handleSetChandelierTypes = (ind: number) => {
      productStore.setChandelierTypes(ind);
    };

    const handleSetMaterials = (ind: number) => {
      productStore.setMaterials(ind);
    };

    const handleSetPictureMaterial = (ind: number) => {
      productStore.setPictureMaterial(ind);
    };

    const handleSetStyles = (ind: number) => {
      productStore.setStyles(ind);
    };

    // Выводим значение "Light" в консоль
    const currentPath = pathname;
    console.log(currentPath);

    const handleSetClear = () => {
      productStore.clearFilters();
      setTrigger((prev) => !prev);
      // productStore.getProducts({});
      productStore.getProducts(20);


      let query = '';                               //Данная функция должна делать то чтобы делать проверку , если имеется такой путь то обязательно добавлять такой еще пазнейм
      switch (pathname) {


        // Свет
        case "/ProductiOnline/Light":
          query = `${pathname}?ProductTypes=1`;
          break;
        case "/ProductiOnline/Light/Lyustri":
          query = `${pathname}?ProductTypes=1&Categories=1`;
          break;
        case "/ProductiOnline/Light/Bra":
          query = `${pathname}?ProductTypes=1&Categories=2`;
          break;
        case "/ProductiOnline/Light/NastolnieLampi":
          query = `${pathname}?ProductTypes=1&Categories=3`;
          break;
        case "/ProductiOnline/Light/Torsheri":
          query = `${pathname}?ProductTypes=1&Categories=4`;
          break;
        case "/ProductiOnline/Light/PodvesnoiSvet":
          query = `${pathname}?ProductTypes=1&Categories=5`;
          break;
        case "/ProductiOnline/Light/PotolochniySvet":
          query = `${pathname}?ProductTypes=1&Categories=6`
          break;
        case "/ProductiOnline/Light/UlichniySvet":
          query = `${pathname}?ProductTypes=1&Categories=7`
          break;
        case "/ProductiOnline/Light/PodsvetkaDlyaKartin":
          query = `${pathname}?ProductTypes=1&Categories=8`
          break;
        case "/ProductiOnline/Light/TrekiSpoti":
          query = `${pathname}?ProductTypes=1&Categories=9`
          break;
        case "/ProductiOnline/Light/LightAccessories":
          query = `${pathname}?ProductTypes=1&Categories=10`
          break;
        default:
          query = `${pathname}?ProductTypes=1`
      }
      router.push(query);
    };

    const handleSetSale = () => {
      // TODO подумать почему
      productStore.setIsSale(!productStore.filters.IsSale);
    };

    useEffect(() => {
      productStore.clearFilters();
    }, [searchParams.get('Category')]);

    const [isSaleChecked, setIsSaleChecked] = useState(productStore.filters.IsSale || false);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setIsSaleChecked(productStore.filters.IsSale || false);
      }, 1);

      return () => {
        clearTimeout(timeoutId);
      };
    }, [productStore.filters.IsSale]);

    let expandIconLight;
    expandIconLight = isOpenLight ? (
      <IoIosArrowUp className="text-base text-skin-base text-opacity-40" />
    ) : (
      <IoIosArrowDown className="text-base text-skin-base text-opacity-40" />
    );

    let expandIconDop;
    expandIconDop = isOpenDop ? (
      <IoIosArrowUp className="text-base text-skin-base text-opacity-40" />
    ) : (
      <IoIosArrowDown className="text-base text-skin-base text-opacity-40" />
    );

    let expandIconColor;
    expandIconColor = isOpenColor ? (
      <IoIosArrowUp className="text-base text-skin-base text-opacity-40" />
    ) : (
      <IoIosArrowDown className="text-base text-skin-base text-opacity-40" />
    );


    const containsAdditionalPath = pathname.split("/").length > 3;


    return (
      <div className={cls.catalogue__filter}>
        <h3 className={cls.filter__title}>
          {sitePathCategory?.filters?.filterName}
        </h3>
        <div className={cls.catalogue__border}>
          <div
            className={`${cls.filter__fil} ${isActive ? cls.filter__fil_mobile : ""}`}
          >
            <button
              onClick={handleClick}
              className={`${cls.close_filter} ${isActive ? cls.close_filter_block : ""}`}
            >
              <span
                className={`${cls.close_filter__l} ${cls.close_filter__perv}`}
              ></span>
              <span
                className={`${cls.close_filter__l} ${cls.close_filter__vtor}`}
              ></span>
            </button>




            {!containsAdditionalPath && (
              <div className={cls.product__fil}>
                <div style={{ paddingBottom: isOpenLight ? '' : '0' }} className={cls.product__fil_style}>
                  <div className={cls.product__fil_styler_ue}>
                    <h4 onClick={() => setOpenLight(!isOpenLight)} style={{ marginBottom: isOpenLight ? '' : '10px' }} className={cls.product__fil_style_head}>
                      {sitePathCategory?.filters?.categoryFiltersArray?.categoryFilterName}
                    </h4>
                    {expandIconLight && <span onClick={() => setOpenLight(!isOpenLight)} className={cls.expandIconitto}>{expandIconLight}</span>}
                  </div>
                  {isOpenLight &&
                    <TypeLight
                      headeDropdownClass={"header__dropdown_wrap_typelught"}
                      array={productStore.filters.Categories || []}
                      onChangeCategory={handleSetCategories}
                      lightCategory={sitePathCategory?.filters?.categoryFiltersArray?.categoryFilter}
                    />
                  }
                </div>
              </div>
            )}


            {sitePathCategory?.filters?.priceFiltersArray &&
              <div className={cls.filter__fil_price}>
                <h4 className={cls.filter__fil_price_head}>
                  {sitePathCategory?.filters?.priceFiltersArray?.priceFilterName}
                </h4>
                <div className={cls.polsunok}>
                  <RangeComponent
                    changeValues={handleSetPrice}
                    trigger={trigger}
                    minValue={productStore.filters.MinPrice || PriceRange.minValue}
                    maxValue={productStore.filters.MaxPrice || PriceRange.maxValue}
                    RangeValue={sitePathCategory?.filters?.priceFiltersArray?.priceFilters}
                  />
                </div>
              </div>
            }
            <div className={cls.product__fil}>
              <div className={`${cls.product__fil_style} ${cls.product__fil_style_sale}`}>
                <h4 className={cls.product__fil_style_head}>Скидка</h4>
                {/* <input
                    type="checkbox"
                    checked={isSaleChecked}
                    onChange={handleSetSale}
                  /> */}
                <div className="flex items-center flex-shrink-0">
                  <label className="switch relative inline-block w-10 cursor-pointer">
                    <Switch checked={isSaleChecked} onChange={handleSetSale} />
                  </label>
                </div>
              </div>
            </div>

            <div className={cls.product__fil}>
              <div className={cls.product__fil_primenit}>
                <button
                  onClick={() => handleGetProducts()}
                  className={cls.product__fil_primenit_search}
                >
                  <span
                    className={`${cls.product__fil_primenit_btn} ${cls.primenit_btn}`}
                  >
                    Применить фильтр
                  </span>
                </button>
                <button
                  onClick={handleSetClear}
                  className={cls.product__fil_primenit_clear}
                >
                  Сбросить фильтр
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);