'use client'

import React from "react";
import { useState } from 'react';
import cls from "./Cart.module.scss";
import { useStore } from "@/hooks/useStore";
import {observer} from "mobx-react";
import Button from '@/components/ui/button';
import { ROUTES } from '@/utils/routes';
import { useRouter } from "next/navigation";

const CartTotal: React.FC = observer(({ }) => {
  const [isEmpty, setIsEmpty] = useState(true);

  const Router = useRouter();

  function orderHeader() {
    isEmpty && Router.push(ROUTES.ORDER);
  }

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


  return (

    <div className="CxtlU">
      <div>
        <div className="v4slS">
          <div className="TKSy2">Итого</div>
          <span className="ui-LD-ZU JVOui" data-testid="price">
            {Math.round(totalDiscountPrice)}<span className="ui-i5wwi ui-VDyJR ui-VWOa-">руб.</span>
          </span>
        </div>
        {!(totalPrice === totalDiscountPrice) ? (
          <div className="KTX0P">
            <div className="BsbQY">
              <div className="AADop">
                {totalCount} товара на сумму
                <span className="ui-LD-ZU pkpSl" data-testid="price">
                {totalPrice}<span className="ui-i5wwi ui-VDyJR ui-VWOa-">руб.</span>
                </span>
              </div>
              <div className="AADop">
                Ваша скидка
                <div className="b_Tvv">
                  <span>-</span>
                  <span className="ui-LD-ZU pkpSl" data-testid="price">
                    {Math.round(truePrice)}<span className="ui-i5wwi ui-VDyJR ui-VWOa-">руб.</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="KTX0P">
            <div className="BsbQY">
              <div className="AADop">
                {totalCount} товара на сумму
                <span className="ui-LD-ZU pkpSl" data-testid="price">
                {totalPrice}<span className="ui-i5wwi ui-VDyJR ui-VWOa-">руб.</span>
                </span>
              </div>
            </div>
          </div>
        )}




        <Button
          variant="formButton"
          className={`w-full mt-8 mb-5 bg-skin-primary text-skin-inverted rounded px-4 py-3 transition-all ${
            isEmpty && 'opacity-40 cursor-not-allowed'
          }`}
          onClick={orderHeader}
        >
          Оформить заказ
        </Button>
        


ИЛИ


<br/>
<br/>

        <div>
          <div className="ldmvk">
            <button form="authFormId" data-testid="checkout-button" className="ui-oyu-F ui-Sommu ui-niVbG ui-8R7U2 HEoVy" type="submit">
              <span className="ui-An69V">Оформить заказ</span>
            </button>
          </div>
          <div className="nuVy0">
            <div className="UVRnF">
              Нажимая кнопку &apos;Оформить заказ&apos;, Вы принимаете условия соответствующей оферты: <span className="ui-GPFV8 ui-HoDUP">Оферты для физических лиц</span> и <a target="_blank" className="ui-GPFV8 ui-HoDUP" href="/static-page/privacy-policy">Политики конфиденциальности</a>, а также даете <span className="ui-GPFV8 ui-HoDUP">Согласие на обработку</span> Ваших персональных данных и их передачу.
            </div>
          </div>
        </div>
        <div className="Pterg">
          <a data-testid="payment-type" className="ui-GPFV8 ER_YK" href="/site/delivery">Способы оплаты</a>
          <a data-testid="delivery-and-assembly" className="ui-GPFV8 ER_YK" href="/site/delivery">Доставка и сборка</a>
          <a data-testid="private-offer" className="ui-GPFV8 ER_YK" href="/static-page/oferta">Оферта для физических лиц</a>
        </div>
      </div>
    </div>


  );
});

export default CartTotal;
