"use client"

import React from 'react';
import emptyCartImg from '@/assets/img/empty_cart.svg';
import cls from '@/app/Cart/Cart.module.scss';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
  import { useRouter } from 'next/navigation';
  import { useUI } from '@/contexts/ui.context';

const CartEmpty: React.FC = () => {
  const { closeDrawer } = useUI();
  const { push } = useRouter();

  const handleButtonClick = () => {
    closeDrawer();
    push('/Home');
  };

  return (
    <>
      <button
        className="flex text-2xl items-center justify-center px-4 md:px-6 py-6 lg:py-7 focus:outline-none transition-opacity text-skin-base hover:opacity-60"
        onClick={closeDrawer}
        aria-label="close">
        <IoClose style={{ width: '35px', height: '35px' }} />
      </button>
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
          <button onClick={handleButtonClick} className={`${cls.button} ${cls.button__black}`}>
            <span>К покупкам</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CartEmpty;
