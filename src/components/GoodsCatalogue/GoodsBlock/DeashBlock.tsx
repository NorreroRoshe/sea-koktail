'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import cls from '../GoodsCatalogue.module.scss';
import { useFavorite } from '../../../hooks/useFavorite';
import { AddToCart } from '@/components/product/add-to-cart';
import { useModalAction } from '@/components/common/modal/modal.context';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // путь к slick.css
import 'slick-carousel/slick/slick-theme.css'; // путь к slick-theme.css
import PP from '@/assets/placeholders/product-placeholder.png';
import Image from '@/components/ui/image';
import { useStore } from '@/hooks/useStore';
import { Product } from '@/types/Product/product.types';
import {observer} from "mobx-react";

type ProdBlockProps = {
  product: Product;
};

export const DeashBlock: React.FC<ProdBlockProps> = observer(({ product }) => {

  const store = useStore();
  const productStore = store.product
  const favoritesStore = store.favorites
  const cartStore = store.cart

  const imageUrl = product.urls ? product.urls[0] : '';

  // const isFavorite = useAppSelector((state) => selectFavoritesItemById(state, product.id));
  const isFavorite = !!favoritesStore.ids?.find((obj) => obj === product.id)

  const { addToFavorite, deleteFromFavorite } = useFavorite();
  const { openModal } = useModalAction();


  // const cartCount = useAppSelector((state) => cartProductCountByIdSelector(product.id, state));
  const cartCount = cartStore.cart?.find((row) => row.id === product.id)?.count || 0;

  const handleChangeFav = () => {
    isFavorite ? deleteFromFavorite(product.id) : addToFavorite(product.id);
  };

  const handlePopupView = () => {
    openModal('DISHES_VIEW', { productId: product.id });
  }

  let discountPercentage = (product.discount * product.price) / 100;
  const mainPrice = Math.round(product.price - discountPercentage)


  return (
    <li className={`${cls.allproduct_goods_item} ${cls.allproduct_goods_itemceawsdc}`}>
      <div className={cls.allproduct_goods_link}>
        <div onClick={handlePopupView} className={`${cls.allproduct_goods_box} ${cls.allproduct_goods_boxcwsqevd}`}>
          {!!imageUrl ? (
            // <img
            // src={imageUrl}
            // alt=""
            // className={`${cls.allproduct_goods_img} ${cls.allproduct_goods_imgwqevrwf}`} />
            <Image
              src={imageUrl}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              quality={10}
              className={`${cls.allproduct_goods_img} ${cls.allproduct_goods_imgwqevrwf}`} />
          ) : (
            <div className="w-auto flex items-center justify-center">
                <Image src={PP} alt={'404!'} className={cls.allproduct_goods_img} />
            </div>
          )}
          {!!product.discount && (
          <span className={cls.allproduct_product_label_ring}>
            <span className={cls.allproduct_product_label_ring_desc}>
              <span>&nbsp;- {product.discount}%</span>
            </span>
          </span>
          )}
           
        </div>
              <p onClick={handlePopupView} className={`${cls.allproduct_goods_artikul} ${cls.allproduct_goods_artikulvebw}`}>{product.name}
                &nbsp;<span>{product.article}</span></p>

        
        <div className={`${cls.allproduct_goods_activity} ${cls.allproduct_goods_activityvbfe}`}>

                <div className={`${cls.allproduct_goods_artikul_wrsdewrhtenapp} ${cls.allproduct_goods_artikul_wrsdewrhtenqwvp}`}>
          <div className={cls.allproduct_goods_artikul_nalnenal}>
            <div className={cls.allproduct_goods_activity_wrapp}>
              <p className={cls.goods_activity_priasdce}>
                {/* 180г /  */}
                {mainPrice}₽</p>
            </div>
            <span className={`${cls.allproduct_goods_nal} ${cls.allproduct_goods_nal_ot}`}>
              {product.availability > 0 ? (
                <span className={cls.goods_nal_desc} style={{color: 'green'}}>{product.availability} шт.</span>
              ) : (
                <span className={cls.goods_nal_desc} style={{color: '#b62908'}}>Предзаказ</span>
              )}
            </span>
          </div>
        </div>
                
          <div className={cls.goods_activity_cartlike_wrapo}>
            <div className={cls.goods_activity_cartlike}>
              <AddToCart cartCount={cartCount} product={product} />
            </div>
          </div>
        </div>
      </div>
      {/* <button
        onClick={handleChangeFav}
        className={`${cls.cartlike__btn2} ${isFavorite ? cls.cartlike__btn2_active : ''}`}
      /> */}
    </li>
  );
});