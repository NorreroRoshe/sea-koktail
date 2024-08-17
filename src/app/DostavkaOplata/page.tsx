"use client"
import React from 'react';
import cls from './DostavkaOplata.module.scss';
import Breadcrumb from '@/components/ui/breadcrumb';

const DostavkaOplata: React.FC = () => {
  return (
    <section className={cls.section_constact}>
      <div className={`${cls.DostavkaOplata_container} ${cls.container}`}>
        <Breadcrumb />
        <h2 className={cls.constact_header}>Оплата</h2>
        <div className={cls.contact_online}>
          <div className={cls.info__col}>
            <div className={cls.info__col_wrap}>
              <div className={cls.info__subheadline}>
                СБП
              </div>
              <p className={cls.info__text}>
                После подтверждения заказа в корзине, вы будете перенаправленны на сайт оплаты yookassa.ru, где сможете оплачивать ваш заказ с помощью QR-кода, и после оплаты вас переведет на страницу заказа , где делатльно будет показан заказ и вся его информация!
              </p>
            </div>
          </div>
          <div className={cls.info__col}>
            <div className={cls.info__col_wrap}>
              <div className={cls.info__subheadline}>
                КАРТОЙ НА САЙТЕ
              </div>
              <p className={cls.info__text}>
                После подтверждения заказа в корзине, вы будете перенаправленны на сайт оплаты yookassa.ru, там вы сможете с помощью своей банковской карты произвести оплату, где сможете оплачивать ваш заказ, и после оплаты вас переведет на страницу заказа , где делатльно будет показан заказ и вся его информация!
              </p>
            </div>
          </div>
        </div>
        <div className={cls.info__text_s}>
          Кроме заказанной позиции при наличном расчёте вы получаете на руки кассовый чек и товарный чек. При безналичном расчёте - товарную накладную (ТОРГ-12) и счет-фактуру.
        </div>
        <div className={`${cls.requisite} ${cls.mrb3015}`}>
          <h4 className={`${cls.requisite__title} ${cls.mrreset} ${cls.tac} ${cls.mrb3015}`}>
            Доставка
          </h4>
          <div className={cls.contact_online}>
            <div className={`${cls.info__col} ${cls.info__col_s}`}>
              <div className={cls.info__col_wrap}>
                <div className={`${cls.info__subheadline} ${cls.info__subheadline_fir}`}>
                  В ПРЕДЕЛАХ МКАД — 490₽
                </div>
              </div>
              <div className={cls.info__col_wrap}>
                <div className={`${cls.info__subheadline} ${cls.info__subheadline_fir}`}>
                  зА ПРЕДЕЛАМИ МКАД - 790₽
                </div>
              </div>
            </div>
            <div className={`${cls.info__col} ${cls.info__col_s}`}>
              <div className={cls.info__col_wrap}>
                <div className={`${cls.info__subheadline} ${cls.info__subheadline_fir}`}>
                  Ближайшее подмосковье - 790₽ + 25 ₽/КМ
                </div>
              </div>
              <div className={cls.info__col_wrap}>
                <div className={`${cls.info__subheadline} ${cls.info__subheadline_fir}`}>
                  САМОВЫВОЗ ИЗ Ресторана — БЕСПЛАТНО
                </div>
              </div>
            </div>
          </div>
          <div className={cls.contact_online}>
            <span>
              Доставка осуществляется сервисом Янедкс.Доставка, после успешной оплаты заказа. После оплаты заказа , вам на телефон поступит сообщение с датой и временем доставки заказа , а так же в вашем личном кабинете будет отображаться статус заказа!
              <br />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DostavkaOplata;
