'use client'

import React from "react";
import { useState } from 'react';
import cls from "./Cart.module.scss";
import { useStore } from "@/hooks/useStore";
import {observer} from "mobx-react";
import Button from '@/components/ui/button';
import { ROUTES } from '@/utils/routes';
import { useRouter } from "next/navigation";
import { IDataOrderReq } from '@/types/Auth/auth.dtos';
import { useForm } from "react-hook-form";
import { useModalAction } from '@/components/common/modal/modal.context';

const CartTotal: React.FC = observer(({ }) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const { closeModal, openModal } = useModalAction();
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  
  const Router = useRouter();

  // function orderHeader() {
  //   isEmpty && Router.push(ROUTES.ORDER);
  // }

  const store = useStore();
  const cartStore = store.cart;

  const totalPrice = cartStore.cartItems.reduce(
    (sum, curr) => sum + (cartStore.cart.find((item) => item.id === curr.id)?.count ?? 1) * curr.price,
    0
  );

  const totalDiscountPrice = cartStore.cartItems.reduce((sum, curr) => {
    const truePrice = curr.price - (curr.price * curr.discount) / 100;
    return truePrice * (cartStore.cart.find((item) => item.id === curr.id)?.count ?? 1) + sum;
  }, 0);

  const totalCount = cartStore.cartItems.reduce((sum, curr) => sum + (cartStore.cart.find((item) => item.id === curr.id)?.count ?? 1), 0);


  const truePrice = totalPrice - totalDiscountPrice;
  console.log(totalPrice === totalPrice, 'cart')



//проба

  const userStore = store.auth;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataOrderReq>({
    defaultValues: {
      deliveryType: 0,
      dayType: 0,
      address: '',
      phone: '',
      dateTime: '',
      description: '',
      payType: 0,
      // adresSamovivoz: ''
    },
  });


  const onSubmit = async ({deliveryType, dayType, address, phone, dateTime, description, payType}: IDataOrderReq) => {
    userStore.dataOrder({
      deliveryType: userStore.deliveryType,
      dayType: userStore.dayType,
      address: userStore.address,
      phone: userStore.phone,
      dateTime: userStore.dateTime,
      description: userStore.description,
      payType: userStore.payType,
      // adresSamovivoz: userStore.
    })
    .then((data) => {
      
      if (data?.data?.message === "Запрос выполнен успешно") {
        Router.push(`${ROUTES.ORDER}?order_id=${userStore.orderId}`);
      } else {

        if (data?.data?.errors?.phone?.[0] === "Поле phone должно содержать 11 цифр.") {
          setPhoneError('Номер телефона должен содержать больше 11 цыфр');
        }
        if (data?.data?.errors?.phone?.[0] === "Поле phone обязательно для заполнения.") {
            setPhoneError('Поле "Контактная информация" обязательно для заполнения.');
        }
        if (data?.data?.errors?.address?.[0] === "Поле address обязательно для заполнения.") {
            setAddressError('Поле "Адрес доставки" обязательно для заполнения.');
        }
      }
    })
  };


  console.log(cartStore.salePercent,'cartStorsaledPrice')


//проба


  
  return (

    <div className="CxtlU">
      <div>
        {/* <div className="v4slS">
          <div className="TKSy2">Итого</div>
          <span className="ui-LD-ZU JVOui" data-testid="price">
            {cartStore?.saledPrice}
            <span className="ui-i5wwi ui-VDyJR ui-VWOa-">руб.</span>
          </span>
        </div> */}
        {/* {!(totalPrice === totalDiscountPrice) ? ( */}
          <div className="KTX0P">
            <div className="BsbQY">
            <div className="TKSy2">Итого</div>
              <div className="AADop">
                {/* {totalCount}  */}
                Товаров на сумму
                <span className="ui-LD-ZU pkpSl" data-testid="price">
                {cartStore?.totalPrice}
                <span className="ui-i5wwi ui-VDyJR ui-VWOa-">руб.</span>
                </span>
              </div>
              <div className="AADop">
                Ваша скидка
                <div className="b_Tvv">
                  <span>-</span>
                  <span className="ui-LD-ZU pkpSl" data-testid="price">
                    {cartStore?.salePercent}
                  </span>
                </div>
              </div>
              <div className="AADop">
                {/* {totalCount}  */}
                Итого со скидкой
                <span className="ui-LD-ZU pkpSl" data-testid="price">
                {cartStore?.saledPrice}
                <span className="ui-i5wwi ui-VDyJR ui-VWOa-">руб.</span>
                </span>
              </div>
            </div>
          </div>
        {/* ) : (
          <div className="KTX0P">
            <div className="BsbQY">
              <div className="AADop">
                {totalCount} товара на сумму
                <span className="ui-LD-ZU pkpSl" data-testid="price">
                {cartStore?.saledPrice}
                <span className="ui-i5wwi ui-VDyJR ui-VWOa-">руб.</span>
                </span>
              </div>
            </div>
          </div>
        )} */}

        {(phoneError || addressError) && (
          <div style={{ border: '1px solid red', padding: '10px', borderRadius: '10px' }}>
            <h4 className="text-red-500 mb-4 font-bold text-center">Ошибка валидации контактной информации:</h4>
            {phoneError && (
              <span className="text-red-500 mb-4">*{phoneError}</span>
            )}
            <br />
            {addressError && (
              <span className="text-red-500 mb-4">*{addressError}</span>
            )}
          </div>
        )}

        <Button
          variant="formButton"
          className={`w-full mt-8 mb-5 bg-skin-primary text-skin-inverted rounded px-4 py-3 transition-all ${
            (!userStore.address || !userStore.phone || !userStore.dateTime) ? 'opacity-40 cursor-not-allowed' : ''
          }`}
          onClick={handleSubmit(onSubmit)}
          disabled={!userStore.address || !userStore.phone || !userStore.dateTime}
        >
          Оформить заказ
        </Button>

                
        <div>
          <div className="nuVy0">
            <div className="UVRnF">
              Нажимая кнопку &apos;Оформить заказ&apos;, Вы принимаете условия соответствующей оферты: <a href="/Oferta" target="_blank" className="ui-GPFV8 ui-HoDUP">Публичной оферты</a> и <a target="_blank" className="ui-GPFV8 ui-HoDUP" href="/Privacy">Политики конфиденциальности</a>, а также даете <a target="_blank" href="/Soglasie" className="ui-GPFV8 ui-HoDUP">Согласие на обработку</a> Ваших персональных данных и их передачу.
            </div>
          </div>
        </div>
        <div className="Pterg">
          <a data-testid="delivery-and-assembly" className="ui-GPFV8 ER_YK" href="/DostavkaOplata">Доставка и оплата</a>
          <a data-testid="private-offer" className="ui-GPFV8 ER_YK" href="/Oferta">Публичная оферта</a>
        </div>
      </div>
    </div>


  );
});

export default CartTotal;
