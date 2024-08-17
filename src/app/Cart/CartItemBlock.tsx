"use client"

import React from 'react';
import cls from './Cart.module.scss';
// import "./Cart.scss";
// import "slick-carousel/slick/slick.css"; // путь к slick.css
// import "slick-carousel/slick/slick-theme.css"; // путь к slick-theme.css
import { useCart } from '../../hooks/useCart';
import Link from 'next/link';
import CartCounter from './CartCounter';
import Slider from 'react-slick';
import Scrollbar from '@/components/ui/scrollbar';
import CartElseProduct from './CartElseProduct'
import { IFileUrl } from '@/types/Product/product.types';
import {observer} from "mobx-react";

type ICollection = {
  id?: string;
  name?: string;
}

type CIBProps = {
  id: string;
  name: string;
  price: number;
  files: IFileUrl[];
  article: string;
  discount: number;
  count: number;
  height: number;
  diameter: number;
  width: number;
  length: number;
  collection: ICollection;
};

const CartItemBlock: React.FC<CIBProps> = observer(({
  id,
  name,
  price,
  count,
  discount,
  files,
  article,
  height,
  diameter,
  width,
  length,
  collection
}) => {
  const { deleteFromCart } = useCart();

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить данную позицию ?')) {
      deleteFromCart(id);
    }
  };

  const truePrice = price - (price * discount) / 100;

  return (
      <div className={`${cls.root_main} ${cls.root_mainqwefvr}`}>
        <div className={cls.root_main_left}>
          <div className={cls.root_main_imgblock}>
            <Link href={`/Product/${id}`} className={cls.main_img}>
              {files && files.length > 0 && (
                <img src={files[0].url} alt={files[0].name} className={cls.root_main_imgblock} />
              )}
            </Link>
          </div>
          <div className={cls.desc_first_insaid}>
            <h2 className={cls.root_main_title}>
              <Link href={`/Product/${id}`} className={cls.root_main_link}>
                {name}
              </Link>
            </h2>
            {/* <span className={cls.root_main_artikul}>
              Арт.:&nbsp; <strong> {article}</strong>
            </span> */}
            <div className={cls.root_main_params}>
              {!!height && (
                <p className={cls.root_main_params_desc}>
                  Высота: <span>{height} см.</span>
                </p>
              )}
              {!!diameter && (
                <p className={cls.root_main_params_desc}>
                  Диаметр: <span>{diameter} см.</span>
                </p>
              )}
              {/* {!!width && width.length > 0 && (
                <p className={cls.root_main_params_desc}>
                  Длинна: <span>{width} см.</span>
                </p>
              )}
              {!!length && length.length > 0 && (
                <p className={cls.root_main_params_desc}>
                  Ширина: <span>{length} см.</span>
                </p>
              )} */}
            </div>
          </div>
        </div>
        <div className={cls.root_main_right}>
          <div className={cls.root_main_prices}>
            {/* {isLoading && 'load'} */}
            <CartCounter id={id} count={count}/>
            <div className={cls.root_main_price}>
              {discount ? (
              <span className={cls.price_discount}>{Math.round(count * price)} ₽.</span>
              ):(<div style={{marginTop: '12px'}}></div>
              )}
              <span className={cls.price_desc}>
                {Math.round(truePrice * count)}
                <span> ₽</span>
              </span>
            </div>
          </div>
          <div onClick={onClickRemove} className={cls.root_main_end}>
            <span className={cls.main_end_remove}>Удалить позицию</span>
          </div>
        </div>
      </div>
  );
});

export default CartItemBlock;
