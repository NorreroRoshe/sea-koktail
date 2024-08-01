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
                Наличными / картой курьеру (Москва и МО)
              </div>
              <p className={cls.info__text}>
                Пожалуйста, предупредите менеджера, чтобы у курьера был с собой терминал для приема карт. Оплата при получении доступна только для Москвы и Московской области.
              </p>
            </div>
            <div className={cls.info__col_wrap}>
              <div className={cls.info__subheadline}>
                Безналичный расчет
              </div>
              <p className={cls.info__text}>
                После подтверждения заказа менеджером, мы выставим вам счет, который можно оплатить в отделении банка или с помощью вашего интернет-банка.
              </p>
            </div>
          </div>
          <div className={cls.info__col}>
            <div className={cls.info__col_wrap}>
              <div className={cls.info__subheadline}>
                КАРТОЙ НА САЙТЕ
              </div>
              <p className={cls.info__text}>
                После подтверждения заказа менеджером, вам будет отправлена ссылка на оплату. *
              </p>
            </div>
            <div className={cls.info__col_wrap}>
              <div className={cls.info__subheadline}>
                НАЛИЧНЫМИ / КАРТОЙ В САЛОНЕ
              </div>
              <p className={cls.info__text}>
                После подтверждения заказа менеджером, мы отправм вам список наших партнерским салонов где можно оплатить заказ.
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
                  В ПРЕДЕЛАХ МКАД ПРИ ПОКУПКЕ МЕНЕЕ 20 000₽ ДОСТАВКА — 1000₽
                </div>
              </div>
              <div className={cls.info__col_wrap}>
                <div className={`${cls.info__subheadline} ${cls.info__subheadline_fir}`}>
                  ЗА ПРЕДЕЛАМИ МКАД ПРИ ПОКУПКЕ ОТ 20 000₽ — 50 ₽/КМ ЗА МКАД
                </div>
              </div>
            </div>
            <div className={`${cls.info__col} ${cls.info__col_s}`}>
              <div className={cls.info__col_wrap}>
                <div className={`${cls.info__subheadline} ${cls.info__subheadline_fir}`}>
                  В ПРЕДЕЛАХ МКАД ПРИ ПОКУПКЕ ОТ 20 000₽ — БЕСПЛАТНО
                </div>
              </div>
              <div className={cls.info__col_wrap}>
                <div className={`${cls.info__subheadline} ${cls.info__subheadline_fir}`}>
                  САМОВЫВОЗ ИЗ САЛОНА — БЕСПЛАТНО
                </div>
              </div>
            </div>
          </div>
          <div className={cls.contact_online}>
            <span>
              При наличии товара на складе, доставка по Москве осуществляется в течение трёх рабочих дней с момента оформления заказа или поступления денежных средств на расчётный счёт компании. Время доставки с 10 до 18 часов в будние дни. Доставка осуществляется до подъезда. Срочная доставка оговаривается индивидуально.
              <br />
              <br />
              Если на момент фактического получения заказа вы отказываетесь от покупки, то вам необходимо будет оплатить доставку в соответствии с п. 3 ст. 497 ГК РФ, в пределах МКАД 1000 руб.; за МКАД 1000 руб. + 50 руб./километр за МКАД. Доставка оплачивается в том случае, если курьер прибыл в условленное время и доставленный товар обладает надлежащим качеством.
            </span>
            <h3 className={cls.h3}>ДОСТАВКА ПО РОССИИ</h3>
            <span>
              осуществляется с помощью транспортных компаний или курьерских служб. Мы предлагаем воспользоваться услугами компаний &apos;Деловые линии&apos;, &apos;ПЭК&apos; или вы можете выбрать любую другую на свой вкус. После оформления заказа на сайте, с вами свяжется наш менеджер, чтобы уточнить детали и выслать счёт на безналичную оплату, который вы сможете оплатить в отделениях банков, с помощью интернет ресурсов или другим удобным способом. После подтверждения платежа мы доставляем товар в транспортную компанию и отправляем его вам. Дополнительно вы оплачиваете только услуги транспортной компании. Доставку до транспортной компании и оформление документов мы берём на себя. Точные сроки и стоимость зависят от региона, веса, габаритов товара и выбранной транспортной компании.
            </span>
            <h3 className={cls.h3}>ТОВАРЫ ПОД ЗАКАЗ: ОСОБЕННОСТИ ОПЛАТЫ И ДОСТАВКИ</h3>
            <span>
              Для приобретения товаров &apos;под заказ&apos;, необходимо внести предоплату. Варианты предоплаты:
              <br />
              - Вы можете внести 70% стоимости товара (или более по желанию), по курсу ЦБ на день оплаты + 10% от суммы за конвертацию. При получении оплачивается оставшаяся часть суммы по курсу ЦБ на день получения + 10% от суммы за конвертацию.
              <br />
              - Вы можете внести полную предоплату - стоимость товара, указанную на сайте.
              <br />
              После получения предоплаты мы размещаем заказ на фабрику, сроки поставки заказных товаров колеблются от 1 месяца до полугода, в зависимости от фабрики-производителя и сложности заказа.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DostavkaOplata;
