"use client"


import React, { useEffect } from 'react';
import cls from './Cart.module.scss';
// import "./Cart.scss";
// import "slick-carousel/slick/slick.css"; // путь к slick.css
// import "slick-carousel/slick/slick-theme.css"; // путь к slick-theme.css
import Slider from 'react-slick';
import Scrollbar from '@/components/ui/scrollbar';
import RenderToElseCart from './RenderToElseCart';
import { ROUTES } from '@/utils/routes';
import { useRouter } from 'next/navigation';
import { useStore } from '@/hooks/useStore';
import {observer} from "mobx-react";
import Link from "next/link";


type ICartElseProduct = {
  colId?: string;
};

const CartElseProduct: React.FC<ICartElseProduct> = observer(({
  colId,
}) => {
  
  const store = useStore();
  const productStore = store.product;
  const collectionStore = store.collection;


  const collectionId = colId;

  const router = useRouter();

  const collection = collectionStore.collections.find((col) => col.id === collectionId)

  useEffect(() => {
    productStore.getCollectionProducts({
      CollectionsId: collectionId,
      From: 0,
      Count: 8,
    });
  }, [collection, collectionId]);


  // const id = '0129deff-af8c-447c-9e72-5693065d7633'
  const [openProduct, setOpenProduct] = React.useState<boolean>(false);
  const elseProduct = () => {
    setOpenProduct(!openProduct);
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  function navigateToCollectionPage() {
    router.push(`${ROUTES.COLLECTIONS}/${collectionId}`);
  }

  return (
    <>
      <div className={cls.root_main_desc_elseproduct}>
        <div onClick={elseProduct} className={`${cls.root_main_desc_maybebox} ${openProduct ? cls.root_main_desc_maybebox_onclick : ''}`}>
          <div className={cls.maybebox_title}>Так же из этой &nbsp;
            {openProduct ? (
              <Link
                href={`${ROUTES.COLLECTIONS}/${collectionId}`}
                // onClick={navigateToCollectionPage}
                style={{ padding: '5px 6px 3px', border: '1px solid black', borderRadius: '3px' }}>
                СЕРИИ &gt;
              </Link>
            ) : (
              <span>серии</span>
            )}
            {/* <span 
          onClick={navigateToCollectionPage}
          style={{padding: '5px 6px 3px', border: '1px solid black', borderRadius: '3px'}}>СЕРИИ ></span> */}
          </div>
          <div
            className={`${cls.maybebox_product} ${openProduct ? cls.maybebox_product_close : ''}`}>
            <ul className={cls.maybebox_product_list}>
              {productStore.collectionItems?.map((obj, i) => (
                <li key={i} className={cls.maybebox_product_item}>
                  <img src={obj.urls ? obj.urls[0] : ''} alt="" className={cls.product_item_photo} />
                </li>
              ))}
            </ul>
          </div>
          {/* <button
          className={`${cls.maybebox_open_allcoll} ${openProduct ? cls.maybebox_open_allcoll_btn : ''}`}
            // onClick={}
            >Посмотреть всю коллекцию</button> */}
          <div onClick={elseProduct} className={cls.maybebox_open}>
            <span
              className={`${cls.maybebox_open_desc} ${openProduct ? cls.maybebox_open_desc_rem : ''}`}>{openProduct ? 'Скрыть' : 'Раскрыть'}</span>
            <div
              className={`${cls.maybebox_open_icon} ${openProduct ? cls.maybebox_open_icon_close : ''
                }`}></div>
          </div>
        </div>
        <div
          className={`${cls.root_main_desc_detalepoduct} ${openProduct ? cls.root_main_desc_detalepoduct_open : ''
            }`}>
          <Slider className={cls.detalepoduct_wrapp} {...sliderSettings}>
            <Scrollbar>

              {productStore.collectionItems?.map((obj, i) => (
                <div key={i} className={cls.detalepoduct_product}>
                  <div className={cls.detalepoduct_product_box}>
                    <div className={cls.detalepoduct_product_link}>
                      <img src={obj.urls ? obj.urls[0] : ''} alt="" className={cls.product_link_photo} />
                    </div>
                    <div className={cls.detalepoduct_product_desc}>{obj.name} <span>{obj.article}</span></div>
                  </div>
                  {obj.discount > 0 ? (
                    <div className={cls.detalepoduct_product_prices}>
                      <span className={cls.product_prices_price}>₽ {Math.round(obj.price - (obj.discount * obj.price) / 100)}</span>
                      <span className={cls.product_prices_discount}>{obj.price}</span>
                    </div>) : (
                    <div className={cls.detalepoduct_product_prices}>

                      <div className={cls.product_prices_price}>
                        ₽ {obj.price}
                      </div>
                    </div>

                  )}
                  {/* <div
                  onClick={() => addToCart(obj.id)}
                  className={`${cls.detalepoduct_product_add} ${
                    obj.price > 0 ? cls.detalepoduct_product_added : ''
                  }`}>
                  {obj.price > 0 ? (<span>Добавлено</span>) : (<span style={{color: '#fff'}}>В корзину</span>)}
                </div> */}
                  <RenderToElseCart prodAdd={obj} />
                </div>
              ))}
            </Scrollbar>

          </Slider>
        </div>
      </div>
    </>
  );
});

export default CartElseProduct;
