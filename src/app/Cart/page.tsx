"use client"
import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/components/ui/breadcrumb';
import cls from './Cart.module.scss';
import CartItemBlock from './CartItemBlock';
import { RadioGroup } from '@headlessui/react';
import CartTotal from './CartTotal';
import CartEmpty from './CartEmpty';
import { useCart } from '../../hooks/useCart';
import { CartSendForm } from './CartSendForm/CartSendForm';
import { useStore } from '@/hooks/useStore';
import {toJS} from "mobx";
import {observer} from "mobx-react";
import CheckoutDetails from '@/components/checkout/checkout-details';
import SamovivozDetails from '@/components/checkout/samovivozDetails';
import {useRouter} from 'next/navigation';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import DeliveryOrSamovivoz from '@/components/checkout/deliveryOrSamovivoz';

const deliveryDateSchedule = [
  'Доставка',
  // 'Самовывоз'
];

const Cart: React.FC = observer(() => {

  const [dateSchedule, setDateSchedule] = useState(deliveryDateSchedule[0]);

  const store = useStore();
  const cartStore = store.cart;
  const productStore = store.product;
  const authStore = store.auth;

  const [isSent, setSent] = useState(false);

  const isAuth = !!authStore.userId;

  useEffect(() => {
    if(authStore.isAuth) {
      cartStore.getUserCart();
    }else {
      cartStore.getUserLocalCart();
    }
  }, []);

  const cart = cartStore.cartItems.map((cartItem) => {
      const count = store.cart.cart.find((countItem) => countItem.id === cartItem?.id)?.count || 0;
      return { ...cartItem, count: count };
    });

    const { clearCart, isLoading, addToCart } = useCart();
    const onClickClear = () => {
    if (window.confirm('Очистить корзину ???')) {
      clearCart();
    }
  };

  
  const localCart = cartStore.cart;
  
    useEffect(() => {
      cartStore.cartItems = [];
      console.log(cartStore.cart);
      cartStore.cart.length > 0 &&
      cartStore.cart.map(
        (row) =>
        productStore.getDetProduct({ ProductId: row.id }).then((pld) => {
          //@ts-ignore
          cartStore.addItem(pld?.data);
        }),
        );
    }, [cartStore.cart]);

    // useEffect(() => {
    //   if (isAuth && authStore.isLoading) {
    //     localCart &&
    //     localCart.map((row) => !cart.map((item) => item.id).includes(row.id) && addToCart(row.id));
    //   }
    // }, [isAuth, authStore.isLoading]);



    // console.log(dateSchedule,'dateSchedule')


    useEffect(() => {
      if (dateSchedule) {
        const deliveryType = dateSchedule === 'Доставка' ? 0 : 1;
        authStore.setDeliveryType(deliveryType);
      }
    }, [dateSchedule]);

  return (
    <div className={cls.section_cart}>
        <div className={`${cls.cart_container} ${cls.container}`}>
          {localCart.length === 0 && typeof window !== 'undefined'
            ? <CartEmpty />
            : (
              <>
              <div className={cls.fqeaefews} >
                <Breadcrumb />
                </div>
                <div className={cls.cart_root}>
                  <div className={cls.cart_root_border}>
                    <div className={cls.cart_header}>
                      <h3 className={cls.cart_title}>КОРЗИНА</h3>
                      <div className={cls.cart_clear}>
                        <button disabled={cartStore.isLoading} onClick={onClickClear} className={cls.cart_clear_desc}>
                          Очистить корзину
                        </button>
                      </div>
                    </div>
                    {cart.map((item: any) =>
                      item.count ? 
                      <CartItemBlock key={item.id} {...item} /> 
                      : undefined,
                    )}


                    {/* Чекбоксы для выбора доставки или самовывоза */}
                    <DeliveryOrSamovivoz deliveryDateSchedule={deliveryDateSchedule} setDateSchedule={setDateSchedule} dateSchedule={dateSchedule}/>

                    {dateSchedule === deliveryDateSchedule[0] ? (
                      <div className="w-full col-start-1 col-end-9">
                        <CheckoutDetails />
                      </div>
                    ) : (
                      <div className="w-full col-start-1 col-end-9">
                        <SamovivozDetails />
                      </div>
                    )}
                  </div>
                  <div className={`F42tj zl0Z8 ${cls.cart_root_border} ${cls.cart_root_itog}`}>
                    <CartTotal />
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div>
  );
});

export default Cart;
