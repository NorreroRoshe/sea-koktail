
"use client"

import React from 'react';
import emptyCartImg from '@/assets/img/empty_cart.svg';
import cls from './Cart.module.scss';
import Breadcrumb from '@/components/ui/breadcrumb';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const CartEmpty: React.FC = () => {
  const { push } = useRouter();
  return (
    <>
      <div style={{marginBottom: '100px'}}>
        <Breadcrumb />
      </div>
      <div className={`${cls.container} ${cls.container__cart}  ${cls.empty_cart_container__cart}`}>
        <div className={`${cls.cart} ${cls.cart__empty}`}>
          <h2>
            Корзина пока пустая <span>😕</span>
          </h2>
          {/* <p>
            Вероятней всего, вы ещё не заказали стильный светильник или еще что : )
            <br />
            Для того, чтобы совершить покупку, перейдите на главную страницу.
          </p> */}
          <Image src={emptyCartImg} alt="Empty cart" />
          <button onClick={() => push('/Home')} className={`${cls.button} ${cls.button__black}`}>
            <span>К покупкам</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CartEmpty;
