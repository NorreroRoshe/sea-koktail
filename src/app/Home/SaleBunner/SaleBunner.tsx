"use client"
import { useEffect, useState } from 'react';
import cls from './SaleBunner.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // путь к slick.css
import 'slick-carousel/slick/slick-theme.css'; // путь к <slick-theme className="css">            - </slick-theme>
import Link from 'next/link';
import { SaleBunnerProduct } from './SaleBunnerProduct';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { useStore } from '@/hooks/useStore';
import {observer} from "mobx-react";

export type SaleType = {
  saleImg: string;
  saleCount: number;
  saleNalichie: number;
  saleArticle: string;
  salePrice: number;
};

export const SaleBunner: React.FC = observer(() => {

  const store = useStore();
  const productStore = store.product;

  const handleSetSale = () => {
    productStore.clearFilters();
    productStore.setIsSale(true);
  };

  const [products, setProducts] = useState([]);

  const pathname = usePathname();

  // const { data, isLoading } = useQuery(['getProducts', pathname], () => {
  //   return getProducts({
  //     Types: [8],
  //   });
  // });
   
  // const data = productStore.getProducts(8, 0, {ProductTypes : 1, Categories : 2});

  useEffect(() => {
    productStore.getProducts(8, 0, {ProductTypes : [1], IsSale: true});
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     // @ts-ignore
  //     setProducts(data.data ? data.data.products : []);
  //   }
  // }, [productStore.isLoading]);

  return (
    <section className={cls.section_saleb}>
      <div className={`${cls.saleb__container}`}>
        <h2 className={cls.saleb_title}>Распродажа</h2>
        <Slider className={cls.main_slider} {...sliderSettings}>
          {!productStore.isLoading &&
            productStore.items?.map((product, i) => <SaleBunnerProduct key={i} product={product} />)}
        </Slider>
        <Link onClick={handleSetSale} href="/Chapter" className={cls.slider_btn}>
          Смотреть всю распродажу
        </Link>
      </div>
    </section>
  );
});

const CustomNextArrow = (props: any) => {
  const { className, onClick } = props;
  return <div className={`${className} ${cls.custom_next}`} onClick={onClick} />;
};

const CustomPrevArrow = (props: any) => {
  const { className, onClick } = props;
  return <div className={`${className} ${cls.custom_prev}`} onClick={onClick} />;
};

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
  slidesToScroll: 1,
  // fade: true,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
  // autoplay: true,
  autoplaySpeed: 2500,
  pauseOnHover: false,
  // centerMode: true,
  // centerPadding: '400px',
};

export default SaleBunner;
