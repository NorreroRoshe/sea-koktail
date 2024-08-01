'use client'
import React, {useEffect} from 'react';
import cls from './Cart.module.scss';
// import "./Cart.scss";
// import "slick-carousel/slick/slick.css"; // путь к slick.css
// import "slick-carousel/slick/slick-theme.css"; // путь к slick-theme.css
import {useCart} from '../../hooks/useCart';
import {Product} from '@/types/Product/product.types';
import {useStore} from '@/hooks/useStore';
import {observer} from 'mobx-react';

type IRenderToElseCart = {
  prodAdd?: Product;
};

const RenderToElseCart: React.FC<IRenderToElseCart> = observer(({ prodAdd }) => {


  const store = useStore();
  const cartStore = store.cart;


  const cartCount = prodAdd ? cartStore.cart.find((row) => row.id === prodAdd.id)?.count || 0 : 0;

  const {deleteFromCart, addToCart} = useCart();


  return (
    <>
      {cartCount > 0 ? (
        <div
          className={`${cls.detalepoduct_product_add} ${cls.detalepoduct_product_added}`}
          onClick={() => prodAdd && deleteFromCart(prodAdd.id)}>
                  <span
                    className={cls.detalepoduct_product_icon_box}>Добавлено
                  <span
                    className={cls.detalepoduct_product_icon}
                  ></span></span>
        </div>
      ) : (
        <div
          onClick={() => prodAdd && addToCart(prodAdd.id)}
          className={cls.detalepoduct_product_add}>
          <span style={{color: '#fff'}}>В корзину</span>
        </div>
      )}
    </>
  );
});

export default RenderToElseCart;
