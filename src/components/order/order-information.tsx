"use client"
import React, { useEffect, useState } from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import OrderDetails from '@/components/order/order-details';
import { useOrderQuery } from '@/framework/basic-rest/order/get-order';
import { useSearchParams } from 'next/navigation';
import usePrice from '@/framework/basic-rest/product/use-price';
import { useTranslation } from 'next-i18next';
import { observer } from "mobx-react";
import { useStore } from '@/hooks/useStore';
import OrderStatusDelivery from './order-status-delivery';
import OrderStatus from './order-status';
import { format } from 'date-fns';
import NotFoundOrder from "@/components/NotFoundBlock/notFoundOrder";
import { ru } from 'date-fns/locale';


const OrderInformation = observer(() => {

  const [{ data }, setState] = useState<any>([]); //дата не всегда заполнялась , просто влязи стейт и засунули в него ответ с сервером


  const [orderError, setOrderError] = useState<boolean>(false);



  const store = useStore();
  const userStore = store.auth;




  const searchParams = useSearchParams();
  const { t } = useTranslation('common');
  // const { data, isLoading } = useOrderQuery(id?.toString()!);
  const { price: total } = usePrice(
    data && {
      amount: data.shipping_fee ? data.total + data.shipping_fee : data.total,
      currencyCode: 'RUB',
    }
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const id = Number(searchParams.get('order_id'));
  //       // Выполняем первый запрос
  //       const statusResponse = await userStore.changeOrderStatusById({
  //         orderId: id,
  //       });
  //       if (statusResponse?.data?.message === "Запрос выполнен успешно") {
  //         // Если статус запроса успешен, выполняем остальные запросы
  //         if (id) {
  //           const response = await userStore.dataGetOrderById({
  //             orderId: id,
  //           });
  //           setState(response as any);
  //         }
  //       }
  //       if (statusResponse?.message === "Заказ не найден") {
  //         setOrderError(true)
  //       } else {
  //         console.error('Ошибка при изменении статуса заказа:', statusResponse?.message);
  //       }
  //     } catch (error) {
  //       console.error('Ошибка при выполнении запросов:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = Number(searchParams.get('order_id'));

        if (id) {
          // Выполняем запрос на изменение статуса заказа
          const statusResponse = await userStore.changeOrderStatusById({
            orderId: id,
          });

          // Если заказ не найден, устанавливаем ошибку
          if (statusResponse?.message === "Заказ не найден") {
            setOrderError(true);
            return; // Останавливаем выполнение, если заказ не найден
          }

          // Независимо от ответа на предыдущий запрос, если заказ найден, выполняем запрос на получение данных о заказе
          const response = await userStore.dataGetOrderById({
            orderId: id,
          });

          setState(response as any);
        }
      } catch (error) {
        console.error('Ошибка при выполнении запросов:', error);
      }
    };

    fetchData();
  }, []);


  const formatDate = (dateString: any) => {
    if (!dateString) {
      return "Неизвестная дата"; // Можете вернуть значение по умолчанию или пустую строку
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Неверная дата"; // На случай, если дата не может быть распознана
    }

    return format(date, "d MMMM yyyy", { locale: ru });
  }


  if (orderError) {
    return <NotFoundOrder />;
  }

  if (userStore.isLoading) return <p>Loading...</p>;

  return (
    <div className="xl:px-32 2xl:px-44 3xl:px-56 py-16 lg:py-20">

      <div className="border border-skin-base bg-skin-secondary px-4 lg:px-5 py-4 rounded-md flex items-center justify-start text-skin-base text-sm md:text-base mb-6 lg:mb-8 cqevtbe">
        <div className="flex items-center justify-start text-skin-base text-sm md:text-base">
          <span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-skin-primary bg-opacity-20 flex items-center justify-center flex-shrink-0" style={{ background: '#02b29033' }}>
            <IoCheckmarkCircle className="w-5 h-5" style={{ color: '#02b290' }} />
          </span>
          {/* {t('text-order-received')} */}
          Спасибо. Ваш заказ получен.
        </div>

      {data?.payStatus !== 0 ? (
        <p className="text-skin-base text-sm md:text-base mb-8" style={{ fontSize: '26px' }}>
          {/* Ссылка на оплату :&nbsp; */}
          <a href={data?.payURL} className="wdfegw text-blue-600 hover:text-blue-600">
            Чек оплаты
          </a>
        </p>
      ) : (
        <p className="text-skin-base text-sm md:text-base mb-8" style={{ fontSize: '26px' }}>
          {/* Ссылка на оплату :&nbsp; */}
          <a href={data?.payURL} className="wdfegw text-blue-600 hover:text-blue-600">
            Перейти к оплате
          </a>
        </p>
      )}
      </div>

      <ul className="border border-skin-base bg-skin-secondary rounded-md flex flex-col md:flex-row mb-7 lg:mb-8 xl:mb-10 items-center wfqegrveasvdeqwv">
        <li className="text-skin-base font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-skin-two px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-xs block text-skin-muted font-normal leading-5">
            {/* {t('text-order-number')}: */}
            НОМЕР ЗАКАЗА :
          </span>
          {data?.formatedOrderId}
        </li>
        <li className="text-skin-base font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-skin-muted font-normal leading-5">
            {/* {t('text-date')}: */}
            ДАТА :
          </span>
          {/* 22 апреля 2024 - не сделано еще!!! */}
          {formatDate(data?.created_at)}
        </li>
        <li className="text-skin-base font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <div>
            <span className="uppercase text-[11px] block text-skin-muted font-normal leading-5">
              {/* {t('text-email')}: */}
              Почта :
            </span>
            {data?.email}
          </div>
          <div>
            <span className="uppercase text-[11px] block text-skin-muted font-normal leading-5">
              {/* {t('text-email')}: */}
              Телефон :
            </span>
            {data?.phone}
          </div>
        </li>
        <li className="text-skin-base font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-skin-muted font-normal leading-5">
            {/* {t('text-total')}: */}
            Итоговая сумма:
          </span>
          {Number(data?.totalCost) + Number(data?.deliveryPrice)} ₽
        </li>
        <li className="text-skin-base font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-skin-muted font-normal leading-5">
            СПОСОБ ОПЛАТЫ :
          </span>
          {data?.payType === 0 ? "Оплата по Банковской карте" : "Оплата по СБП"}

        </li>
      </ul>


      {data?.deliveryType === 0 ? (
        <OrderStatusDelivery status={data?.payStatus} />
        ) : data?.deliveryType === 1 ? (
        <OrderStatus status={data?.payStatus} />
      ) : null}


      {/* <p className="text-skin-base text-sm md:text-base mb-8"> */}
        {/* Статус оплаты :&nbsp; */}
        {/* <span className={data?.payStatus !== 0 ? "text-green-600" : "text-red-600"}>
          {data?.payStatus !== 0 ? "Оплата выполнена!" : ""}
        </span>
      </p> */}

      <OrderDetails orderi={data} />
    </div>
  );
})

export default OrderInformation;

