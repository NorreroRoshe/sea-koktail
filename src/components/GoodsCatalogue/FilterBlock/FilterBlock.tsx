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
import { arrayToString, isEntryArray } from "@/api/Product/ProductService";

export interface IRange {
  minValue: number;
  maxValue: number;
}

const DiametrRange: IRange = {
  minValue: 0,
  maxValue: 2000,
};

const LampCountRange: IRange = {
  minValue: 0,
  maxValue: 20,
};

const HeightRange: IRange = {
  minValue: 0,
  maxValue: 2000,
};

const WidthRange: IRange = {
  minValue: 0,
  maxValue: 1500,
};

const LengthRange: IRange = {
  minValue: 0,
  maxValue: 2000,
};

const IndentRange: IRange = {
  minValue: 0,
  maxValue: 1500,
};

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

export const FilterBlock: React.FC<FilterProps> = observer(
  ({ handleClick, isActive, handleGetProducts, sitePathCategory }) => {

    const store = useStore();
    const productStore = store.product

    const pathname = usePathname();
    const router = useRouter();

    const [isOpenLight, setOpenLight] = useState<boolean>(
      pathname === "/Chapter/Carpets" || pathname === "/Chapter/LightAccessories" ? true : false
    );
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
        case "/Chapter/Light":
          query = `${pathname}?ProductTypes=1`;
          break;
        case "/Chapter/Light/Lyustri":
          query = `${pathname}?ProductTypes=1&Categories=1`;
          break;
        case "/Chapter/Light/Bra":
          query = `${pathname}?ProductTypes=1&Categories=2`;
          break;
        case "/Chapter/Light/NastolnieLampi":
          query = `${pathname}?ProductTypes=1&Categories=3`;
          break;
        case "/Chapter/Light/Torsheri":
          query = `${pathname}?ProductTypes=1&Categories=4`;
          break;
        case "/Chapter/Light/PodvesnoiSvet":
          query = `${pathname}?ProductTypes=1&Categories=5`;
          break;
        case "/Chapter/Light/PotolochniySvet":
          query = `${pathname}?ProductTypes=1&Categories=6`
          break;
        case "/Chapter/Light/UlichniySvet":
          query = `${pathname}?ProductTypes=1&Categories=7`
          break;
        case "/Chapter/Light/PodsvetkaDlyaKartin":
          query = `${pathname}?ProductTypes=1&Categories=8`
          break;
        case "/Chapter/Light/TrekiSpoti":
          query = `${pathname}?ProductTypes=1&Categories=9`
          break;
        case "/Chapter/Light/LightAccessories":
          query = `${pathname}?ProductTypes=1&Categories=10`

          break;



        // Мебель
        case "/Chapter/Furniture":
          query = `${pathname}?ProductTypes=2`
          break;
        case "/Chapter/Furniture/Divani":
          query = `${pathname}?ProductTypes=2&Categories=11`

          break;
        case "/Chapter/Furniture/Kresla":
          query = `${pathname}?ProductTypes=2&Categories=12`

          break;
        case "/Chapter/Furniture/Stoli":
          query = `${pathname}?ProductTypes=2&Categories=13`

          break;
        case "/Chapter/Furniture/Stulya":
          query = `${pathname}?ProductTypes=2&Categories=14`

          break;
        case "/Chapter/Furniture/Komodi":
          query = `${pathname}?ProductTypes=2&Categories=15`

          break;
        case "/Chapter/Furniture/Konsoli":
          query = `${pathname}?ProductTypes=2&Categories=16`

          break;
        case "/Chapter/Furniture/Krovati":
          query = `${pathname}?ProductTypes=2&Categories=17`

          break;
        case "/Chapter/Furniture/Matrasi":
          query = `${pathname}?ProductTypes=2&Categories=18`

          break;
        case "/Chapter/Furniture/PufiBanketki":
          query = `${pathname}?ProductTypes=2&Categories=19`

          break;

        // Зеркала
        case "/Chapter/Mirrors":
          query = `${pathname}?ProductTypes=3`
          break;
        case "/Chapter/Mirrors/Artobj":
          query = `${pathname}?ProductTypes=3&Categories=20`

          break;
        case "/Chapter/Mirrors/Sprintami":
          query = `${pathname}?ProductTypes=3&Categories=21`

          break;
        case "/Chapter/Mirrors/Solnishko":
          query = `${pathname}?ProductTypes=3&Categories=22`

          break;
        case "/Chapter/Mirrors/Sderevom":
          query = `${pathname}?ProductTypes=3&Categories=23`

          break;
        case "/Chapter/Mirrors/DesignMetall":
          query = `${pathname}?ProductTypes=3&Categories=24`

          break;
        case "/Chapter/Mirrors/Klassicheskie":
          query = `${pathname}?ProductTypes=3&Categories=25`

          break;
        case "/Chapter/Mirrors/Nastolnie":
          query = `${pathname}?ProductTypes=3&Categories=26`

          break;
        case "/Chapter/Mirrors/Napolnie":
          query = `${pathname}?ProductTypes=3&Categories=27`

          break;
        case "/Chapter/Mirrors/Pryamougolnie":
          query = `${pathname}?ProductTypes=3&Categories=28`

          break;
        case "/Chapter/Mirrors/Kruglie":
          query = `${pathname}?ProductTypes=3&Categories=29`

          break;

        // Ковры
        case "/Chapter/Carpets":
          query = `${pathname}?ProductTypes=4`
          break;
        case "/Chapter/Carpets/Pryamougolnie":
          query = `${pathname}?ProductTypes=4&Categories=30`
          break;
        case "/Chapter/Carpets/Kvadratnie":
          query = `${pathname}?ProductTypes=4&Categories=31`
          break;
        case "/Chapter/Carpets/Kruglie":
          query = `${pathname}?ProductTypes=4&Categories=32`
          break;
        case "/Chapter/Carpets/Ovalnie":
          query = `${pathname}?ProductTypes=4&Categories=33`
          break;
        case "/Chapter/Carpets/Dorojki":
          query = `${pathname}?ProductTypes=4&Categories=34`
          break;
        case "/Chapter/Carpets/Nestandartnie":
          query = `${pathname}?ProductTypes=4&Categories=35`
          break;


        case "/Chapter/GoodsForHome":
          query = `${pathname}?ProductTypes=5`;
          break;
        case "/Chapter/GoodsForHome/Tarelki":
          query = `${pathname}?ProductTypes=5&Categories=36`
          break;
        case "/Chapter/GoodsForHome/Stremyanki":
          query = `${pathname}?ProductTypes=5&Categories=37`
          break;
        case "/Chapter/GoodsForHome/Sushilki":
          query = `${pathname}?ProductTypes=5&Categories=38`
          break;
        case "/Chapter/GoodsForHome/Gladilki":
          query = `${pathname}?ProductTypes=5&Categories=39`
          break;
        case "/Chapter/GoodsForHome/VeshalkiNapolnie":
          query = `${pathname}?ProductTypes=5&Categories=40`
          break;
        case "/Chapter/GoodsForHome/VeshalkiNastennie":
          query = `${pathname}?ProductTypes=5&Categories=41`
          break;
        case "/Chapter/GoodsForHome/BathAccess":
          query = `${pathname}?ProductTypes=5&Categories=42`
          break;
        case "/Chapter/GoodsForHome/LojkiObuvi":
          query = `${pathname}?ProductTypes=5&Categories=43`
          break;
        case "/Chapter/GoodsForHome/VaziPodsvechniki":
          query = `${pathname}?ProductTypes=5&Categories=44`
          break;
        case "/Chapter/GoodsForHome/Podushki":
          query = `${pathname}?ProductTypes=5&Categories=45`
          break;
        case "/Chapter/GoodsForHome/Pledi":
          query = `${pathname}?ProductTypes=5&Categories=46`
          break;
        case "/Chapter/GoodsForHome/Pokrivala":
          query = `${pathname}?ProductTypes=5&Categories=47`
          break;


        case "/Chapter/Accessories":
          query = `${pathname}?ProductTypes=6`;
          break;
        case "/Chapter/Accessories/Statuetki":
          query = `${pathname}?ProductTypes=6&Categories=48`
          break;
        case "/Chapter/Accessories/Watches":
          query = `${pathname}?ProductTypes=6&Categories=49`
          break;
        case "/Chapter/Accessories/NastolnieIgri":
          query = `${pathname}?ProductTypes=6&Categories=50`
          break;
        case "/Chapter/Accessories/Zonti":
          query = `${pathname}?ProductTypes=6&Categories=51`
          break;
        case "/Chapter/Accessories/PodstavkaDlyaZontov":
          query = `${pathname}?ProductTypes=6&Categories=52`
          break;
        case "/Chapter/Accessories/LojkiDlyaObuvi":
          query = `${pathname}?ProductTypes=6&Categories=53`
          break;
        case "/Chapter/Accessories/DerjateliKnig":
          query = `${pathname}?ProductTypes=6&Categories=54`
          break;


        case "/Chapter/Paintings":
          query = `${pathname}?ProductTypes=7`;
          break;
        case "/Chapter/Paintings/Artobj":
          query = `${pathname}?ProductTypes=7&Categories=55`
          break;
        case "/Chapter/Paintings/Avtorskie":
          query = `${pathname}?ProductTypes=7&Categories=56`
          break;
        case "/Chapter/Paintings/Posteri":
          query = `${pathname}?ProductTypes=7&Categories=57`
          break;
        case "/Chapter/Paintings/WithLego":
          query = `${pathname}?ProductTypes=7&Categories=58`
          break;
        case "/Chapter/Paintings/SportStyle":
          query = `${pathname}?ProductTypes=7&Categories=59`
          break;
        case "/Chapter/Paintings/Reproduction":
          query = `${pathname}?ProductTypes=7&Categories=60`
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

    // useEffect(() => {
    //   if (pathname === '/Outlet') {
    //     productStore.getProducts(20);
    //     const isSaletimeout = setTimeout(() => {
    //       productStore.setIsSale(true);
    //       productStore.getProducts(20, { IsSale: true, SortType: 0 });
    //     }, 100);

    //     return () => {
    //       clearTimeout(isSaletimeout);
    //     };
    //   }
    // }, [pathname]);

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

    const NotshouldDisplayFilterBlockProductTypes =
      pathname.includes("/Chapter");

    const NotshouldDisplayFilterBlock =
      pathname.includes("/Chapter/Light") ||
      pathname.includes("/Chapter/Furniture") ||
      pathname.includes("/Chapter/Mirrors") ||
      pathname.includes("/Chapter/GoodsForHome") ||
      pathname.includes("/Chapter/Accessories") ||
      pathname.includes("/Chapter/Carpets") ||
      pathname.includes("/Chapter/Paintings");

    const NotshouldDisplayFilterLight = pathname === "/Chapter/Light";


    const NotshouldDisplayFilterMirrorsVisShir =
      pathname.includes("/Chapter/Mirrors/Kruglie") ||
      pathname.includes("/Chapter/Mirrors/Solnishko");


    const NotshouldDisplayFilterLightShir =
      pathname.includes("/Chapter/Light") ||
      pathname.includes("/Chapter/Light/Bra") ||
      pathname.includes("/Chapter/Light/NastolnieLampi") ||
      pathname.includes("/Chapter/Light/Torsheri") ||
      pathname.includes("/Chapter/Light/PodvesnoiSvet") ||
      pathname.includes("/Chapter/Light/UlichniySvet") ||
      pathname.includes("/Chapter/Light/PotolochniySvet") ||
      pathname.includes("/Chapter/Light/AccessForLight");

    const NotshouldDisplayFilterMirrorsDiam =
      pathname === "/Chapter/Mirrors" ||
      pathname.includes("/Chapter/Mirrors/Artobj") ||
      pathname.includes("/Chapter/Mirrors/Sprintami") ||
      pathname.includes("/Chapter/Mirrors/Klassicheskie") ||
      pathname.includes("/Chapter/Mirrors/Sderevom") ||
      pathname.includes("/Chapter/Mirrors/DesignMetall") ||
      pathname.includes("/Chapter/Mirrors/Nastolnie") ||
      pathname.includes("/Chapter/Mirrors/Napolnie") ||
      pathname.includes("/Chapter/Mirrors/Pryamougolnie");

    const NotshouldDisplayFilterCarpetDiam =
      pathname === "/Chapter/Carpets" ||
      pathname.includes("/Chapter/Carpets/Pryamougolnie") ||
      pathname.includes("/Chapter/Carpets/Kvadratnie") ||
      pathname.includes("/Chapter/Carpets/Ovalnie") ||
      pathname.includes("/Chapter/Carpets/Dorojki") ||
      pathname.includes("/Chapter/Carpets/Nestandartnie");

    const NotshouldDisplayFilterCarpetDlinShir =
      pathname.includes("/Chapter/Carpets/Kruglie");

    const NotshouldDisplayFilterLightOtstup =
      pathname.includes("/Chapter/Light/Bra") ||
      pathname.includes("/Chapter/Light/PodsvetkaDlyaKartin") ||
      pathname.includes("/Chapter/Light/TrekiSpoti");

    const NotshouldDisplayFilterMirrorsMaterial =
      pathname.includes("/Chapter/Mirrors/Sderevom") ||
      pathname.includes("/Chapter/Mirrors/DesignMetall");

    const NotshouldDisplayFilterLightDlinna =
      pathname.includes("/Chapter/Light/Lyustri") ||
      pathname.includes("/Chapter/Light/Bra") ||
      pathname.includes("/Chapter/Light/NastolnieLampi") ||
      pathname.includes("/Chapter/Light/Torsheri") ||
      pathname.includes("/Chapter/Light/PodvesnoiSvet") ||
      pathname.includes("/Chapter/Light/PotolochniySvet") ||
      pathname.includes("/Chapter/Light/UlichniySvet");


    const NotshouldDisplayFilterLightDiam =
      pathname.includes("/Chapter/Light/PodsvetkaDlyaKartin") ||
      pathname.includes("/Chapter/Light/TrekiSpoti");

    const NotshouldDisplayFilterLightAccess =
      pathname.includes("/Chapter/Light/UlichniySvet") ||
      pathname.includes("/Chapter/Light/PodsvetkaDlyaKartin") ||
      pathname.includes("/Chapter/Light/TrekiSpoti");
    pathname.includes("/Chapter/Light/AcsesuariDlyaSveta");

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




            {!containsAdditionalPath && !NotshouldDisplayFilterBlock && (
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
                      array={productStore.filters.ProductTypes || []}
                      onChangeCategory={handleSetTypeProduct}
                      lightCategory={sitePathCategory?.filters?.categoryFiltersArray?.categoryFilter}
                    />
                  }
                </div>
              </div>
            )}




            {!containsAdditionalPath && NotshouldDisplayFilterBlock && (
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

            {sitePathCategory?.filters?.carpetStyleFiltersArray &&
              <div className={cls.product__fil}>
                <div style={{ paddingBottom: isOpenDop ? '' : '0' }} className={cls.product__fil_style}>
                  <div className={cls.product__fil_styler_ue}>
                    <h4 onClick={() => setOpenDop(!isOpenDop)} style={{ marginBottom: isOpenDop ? '' : '10px' }} className={cls.product__fil_style_head}>
                      {sitePathCategory?.filters?.carpetStyleFiltersArray?.carpetStyleFilterName}
                    </h4>
                    {expandIconDop && <span onClick={() => setOpenDop(!isOpenDop)} className={cls.expandIconitto}>{expandIconDop}</span>}
                  </div>
                  {isOpenDop &&
                    <TypeLight
                      headeDropdownClass={"header__dropdown_wrap_lightCategory"}
                      array={productStore.filters.Styles || []}
                      onChangeCategory={handleSetStyles}
                      lightCategory={sitePathCategory?.filters?.carpetStyleFiltersArray?.carpetStyleFilter}
                    />
                  }
                </div>
              </div>
            }

            {sitePathCategory?.filters?.colorFiltersArray &&
              <div className={cls.filter__fil_color}>
                <div className={cls.product__fil_styler_ue}>
                  <h4 onClick={() => setOpenColor(!isOpenColor)} className={cls.filter__fil_color_head}>
                    {sitePathCategory?.filters?.colorFiltersArray?.colorFilterName}
                  </h4>
                  {expandIconColor && <span onClick={() => setOpenColor(!isOpenColor)} className={cls.expandIconittos}>{expandIconColor}</span>}
                </div>
                {isOpenColor &&
                  <Colorcheckbox
                    onChangeCategory={handleSetTypeColors}
                    array={productStore.filters.Colors || []}
                    sitePathCategory={sitePathCategory?.filters?.colorFiltersArray?.colorFilters}
                  />
                }
              </div>
            }

            {sitePathCategory?.filters?.styleFiltersArray &&
              <div className={cls.product__fil}>
                <div style={{ paddingBottom: isOpenDop ? '' : '0' }} className={cls.product__fil_style}>
                  <div className={cls.product__fil_styler_ue}>
                    <h4 onClick={() => setOpenDop(!isOpenDop)} style={{ marginBottom: isOpenDop ? '' : '10px' }} className={cls.product__fil_style_head}>
                      {sitePathCategory?.filters?.styleFiltersArray?.styleFilterName}
                    </h4>
                    {expandIconDop && <span onClick={() => setOpenDop(!isOpenDop)} className={cls.expandIconitto}>{expandIconDop}</span>}
                  </div>
                  {isOpenDop &&
                    <TypeLight
                      headeDropdownClass={"header__dropdown_wrap_lightCategory"}
                      array={productStore.filters.Styles || []}
                      onChangeCategory={handleSetStyles}
                      lightCategory={sitePathCategory?.filters?.styleFiltersArray?.styleFilter}
                    />
                  }
                </div>
              </div>
            }

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

            {sitePathCategory?.filters?.diametrFiltersArray && !NotshouldDisplayFilterLight &&
              !NotshouldDisplayFilterLightDiam &&
              !NotshouldDisplayFilterMirrorsDiam &&
              !NotshouldDisplayFilterCarpetDiam &&
              <div className={cls.filter__fil_price}>
                <h4 className={cls.filter__fil_price_head}>
                  {sitePathCategory?.filters?.diametrFiltersArray?.polsunokFilterName}
                </h4>
                <div className={cls.polsunok}>
                  <RangeComponent
                    changeValues={handleSetDiameter}
                    trigger={trigger}
                    minValue={productStore.filters.MinDiameter || DiametrRange.minValue}
                    maxValue={productStore.filters.MaxDiameter || DiametrRange.maxValue}
                    RangeValue={sitePathCategory?.filters?.diametrFiltersArray?.polsunokFilters}
                  />
                </div>
              </div>
            }

            {sitePathCategory?.filters?.dlinnaFiltersArray &&
              !NotshouldDisplayFilterLight &&
              !NotshouldDisplayFilterMirrorsVisShir &&
              !NotshouldDisplayFilterLightDlinna &&
              !NotshouldDisplayFilterCarpetDlinShir &&
              <div className={cls.filter__fil_price}>
                <h4 className={cls.filter__fil_price_head}>
                  {sitePathCategory?.filters?.dlinnaFiltersArray?.polsunokFilterName}
                </h4>
                <div className={cls.polsunok}>
                  <RangeComponent
                    changeValues={handleSetLength}
                    trigger={trigger}
                    minValue={productStore.filters.MinLength || LengthRange.minValue}
                    maxValue={productStore.filters.MaxLength || LengthRange.maxValue}
                    RangeValue={sitePathCategory?.filters?.dlinnaFiltersArray?.polsunokFilters}
                  />
                </div>
              </div>
            }

            {sitePathCategory?.filters?.shirinaFiltersArray &&
              !NotshouldDisplayFilterMirrorsVisShir &&
              !NotshouldDisplayFilterLightShir &&
              !NotshouldDisplayFilterCarpetDlinShir &&
              <div className={cls.filter__fil_price}>
                <h4 className={cls.filter__fil_price_head}>
                  {sitePathCategory?.filters?.shirinaFiltersArray?.polsunokFilterName}
                </h4>
                <div className={cls.polsunok}>
                  <RangeComponent
                    changeValues={handleSetWidth}
                    trigger={trigger}
                    minValue={productStore.filters.MinWidth || WidthRange.minValue}
                    maxValue={productStore.filters.MaxWidth || WidthRange.maxValue}
                    RangeValue={sitePathCategory?.filters?.shirinaFiltersArray?.polsunokFilters}
                  />
                </div>
              </div>
            }

            {sitePathCategory?.filters?.visotaFiltersArray && !NotshouldDisplayFilterLight &&
              <div className={cls.filter__fil_price}>
                <h4 className={cls.filter__fil_price_head}>
                  {sitePathCategory?.filters?.visotaFiltersArray?.polsunokFilterName}
                </h4>
                <div className={cls.polsunok}>
                  <RangeComponent
                    changeValues={handleSetHeight}
                    trigger={trigger}
                    minValue={productStore.filters.MinHeight || HeightRange.minValue}
                    maxValue={productStore.filters.MaxHeight || HeightRange.maxValue}
                    RangeValue={sitePathCategory?.filters?.visotaFiltersArray?.polsunokFilters}
                  />
                </div>
              </div>
            }

            {sitePathCategory?.filters?.otstupFiltersArray &&
              !NotshouldDisplayFilterLight &&
              NotshouldDisplayFilterLightOtstup &&
              (<div className={cls.filter__fil_price}>
                <h4 className={cls.filter__fil_price_head}>
                  {sitePathCategory?.filters?.otstupFiltersArray?.polsunokFilterName}
                </h4>
                <div className={cls.polsunok}>
                  <RangeComponent
                    changeValues={handleSetIndent}
                    trigger={trigger}
                    minValue={productStore.filters.MinIndent || IndentRange.minValue}
                    maxValue={productStore.filters.MaxIndent || IndentRange.maxValue}
                    RangeValue={sitePathCategory?.filters?.otstupFiltersArray?.polsunokFilters}
                  />
                </div>
              </div>
              )}

            {sitePathCategory?.filters?.lampCountFiltersArray &&
              <div className={cls.filter__fil_price}>
                <h4 className={cls.filter__fil_price_head}>
                  {sitePathCategory?.filters?.lampCountFiltersArray?.polsunokFilterName}
                </h4>
                <div className={cls.polsunok}>
                  <RangeComponent
                    changeValues={handleSetLampsCount}
                    trigger={trigger}
                    minValue={productStore.filters.MinLampCount || LampCountRange.minValue}
                    maxValue={productStore.filters.MaxLampCount || LampCountRange.maxValue}
                    RangeValue={sitePathCategory?.filters?.lampCountFiltersArray?.polsunokFilters}
                  />
                </div>
              </div>
            }

            {sitePathCategory?.filters?.materialFiltersArray &&
              !NotshouldDisplayFilterMirrorsMaterial &&
              <div className={cls.product__fil}>
                <div style={{ paddingBottom: isOpenDop ? '' : '0' }} className={cls.product__fil_style}>
                  <div className={cls.product__fil_styler_ue}>
                    <h4 onClick={() => setOpenDop(!isOpenDop)} style={{ marginBottom: isOpenDop ? '' : '10px' }} className={cls.product__fil_style_head}>
                      {sitePathCategory?.filters?.materialFiltersArray?.materialFilterName}
                    </h4>
                    {expandIconDop && <span onClick={() => setOpenDop(!isOpenDop)} className={cls.expandIconitto}>{expandIconDop}</span>}
                  </div>
                  {isOpenDop &&
                    <TypeLight
                      headeDropdownClass={"header__dropdown_wrap_lightCategory"}
                      array={productStore.filters.Materials || []}
                      onChangeCategory={handleSetMaterials}
                      lightCategory={sitePathCategory?.filters?.materialFiltersArray?.materialFilter}
                    />
                  }
                </div>
              </div>
            }
            {sitePathCategory?.filters?.materialPaintFiltersArray &&
              <div className={cls.product__fil}>
                <div style={{ paddingBottom: isOpenDop ? '' : '0' }} className={cls.product__fil_style}>
                  <div className={cls.product__fil_styler_ue}>
                    <h4 onClick={() => setOpenDop(!isOpenDop)} style={{ marginBottom: isOpenDop ? '' : '10px' }} className={cls.product__fil_style_head}>
                      {sitePathCategory?.filters?.materialPaintFiltersArray?.materialPaintFilterName}
                    </h4>
                    {expandIconDop && <span onClick={() => setOpenDop(!isOpenDop)} className={cls.expandIconitto}>{expandIconDop}</span>}
                  </div>
                  {isOpenDop &&
                    <TypeLight
                      headeDropdownClass={"header__dropdown_wrap_lightCategory"}
                      array={productStore.filters.PictureMaterial || []}
                      onChangeCategory={handleSetPictureMaterial}
                      lightCategory={sitePathCategory?.filters?.materialPaintFiltersArray?.materialPaintFilter}
                    />
                  }
                </div>
              </div>
            }
            {sitePathCategory?.filters?.dopFiltersArray &&
              !NotshouldDisplayFilterLightAccess &&
              <div className={cls.product__fil}>
                <div style={{ paddingBottom: isOpenDop ? '' : '0' }} className={cls.product__fil_style}>
                  <div className={cls.product__fil_styler_ue}>
                    <h4 onClick={() => setOpenDop(!isOpenDop)} style={{ marginBottom: isOpenDop ? '' : '10px' }} className={cls.product__fil_style_head}>
                      {sitePathCategory?.filters?.dopFiltersArray?.dopFilterName}
                    </h4>
                    {expandIconDop && <span onClick={() => setOpenDop(!isOpenDop)} className={cls.expandIconitto}>{expandIconDop}</span>}
                  </div>
                  {isOpenDop &&
                    <TypeLight
                      headeDropdownClass={"header__dropdown_wrap_lightCategory"}
                      array={productStore.filters.ChandelierTypes || []}
                      onChangeCategory={handleSetChandelierTypes}
                      lightCategory={sitePathCategory?.filters?.dopFiltersArray?.dopFilter}
                    />
                  }
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