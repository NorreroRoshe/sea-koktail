"use client"
import React, { useEffect, useState } from 'react';
import { OrderDetailsContent } from './order-details-content';
import { formatAddress } from '@/utils/format-address';
import OrderStatus from './order-status';
import OrderStatusDelivery from './order-status-delivery';
import {
  DiscountPrice,
  DeliveryFee,
  TotalPrice,
  SubTotalPrice,
} from '@/components/order/price';
import { useUI } from '@/contexts/ui.context';
import { useStore } from '@/hooks/useStore';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { observer } from "mobx-react";
import Link from 'next/link';

const OrderDrawer: React.FC = observer(() => {
  const { data, closeDrawer } = useUI();
  const [{ datas }, setState] = useState<any>([]);
  
  
  const store = useStore();
  const userStore = store.auth;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = data.id;
        if (id) {
          await userStore.changeOrderStatusById({
            orderId: id,
          });
          const response = await userStore.dataGetOrderById({
            orderId: id,
          });
          setState(response as any);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();

  }, [data.id]);

  const onClickRemovePhone = async () => {
    const id = data.id;
    if (window.confirm('Вы действительно хотите удалить данный заказ ?')) {
      await userStore.removeOrderById({orderId: id });
      await closeDrawer();
      await userStore.getUserOrders({orderCount: 100})
      // await userStore.dataGetOrderById({ orderId: id });
    }
  };
  
  const onClose = () => {
    return closeDrawer();
  };

  // let { shipping_address } = data;

  let formattedDate = "Дата не указана";

  if (data?.dateTime) {
    try {
      const date = new Date(data.dateTime);

      if (!isNaN(date.getTime())) {
        formattedDate = format(date, "d MMMM yyyy 'г.' 'в' HH:mm", { locale: ru });
      }
    } catch (error) {
      console.error("Error formatting date:", error);
    }
  }

  return (
    <>
      {data !== '' && (
        <>
          <div className="p-8">
            <h2 className="text-xl font-semibold mb-8">Детали заказа</h2>
            {data?.deliveryType === 0 ? (
              <div className="text-[14px] opacity-70 mb-3 text-skin-base">
                Адрес, дата и время доставки:
              </div>
            ) : data?.deliveryType === 1 ? (
              <div className="text-[14px] opacity-70 mb-3 text-skin-base">
                Адрес, дата и время самовывоза:
              </div>
            ) : null}
            <div className="rounded border border-solid min-h-[90px] bg-skin-two p-4 border-skin-two text-[12px] md:text-[14px]">
              <p className="text-skin-base opacity-70">
                {data?.deliveryType === 0 ? (
                  <>
                    {data?.address}
                  </>
                ) : data?.deliveryType === 1 ? (
                  <>
                    {data?.adresSamovivoz}
                  </>
                ) : null}
                <br/>
                <br/>
                {formattedDate}
              </p>
            </div>
            {data?.payStatus !== 0 ? (
              <p style={{fontSize: '15px', fontStyle: 'italic'}} className="text-end mt-5 mb-5">
                <a href={data?.payURL} className="text-blue-600 hover:text-blue-600">
                  Чек оплаты
                </a>
              </p>
            ) : (
              <p style={{fontSize: '15px', fontStyle: 'italic'}} className="text-end mt-5 mb-5">
                <a href={data?.payURL} className="text-blue-600 hover:text-blue-600">
                  Перейти к оплате!
                </a>
              </p>
            )}
            {data?.payStatus !== 0 ? (
              <></>
            ) : (
              <>
                <p style={{fontSize: '12px', fontStyle: 'italic'}} className="text-end mt-5 mb-5">
                  *Неоплаченные заказы будут автоматически удаляться в течении 10 минут!
                </p>
              </>
            )}
            
            {/* <OrderStatus status={data?.payStatus} /> */}
            {data?.deliveryType === 0 ? (
              <OrderStatusDelivery status={data?.payStatus} />
              ) : data?.deliveryType === 1 ? (
              <OrderStatus status={data?.payStatus} />
            ) : null}

            <div className="grid grid-cols-12 bg-skin-two py-3 rounded-[3px] text-black text-[12px] md:text-[14px]">
              <div className="col-span-2 opacity-50"></div>
              <div className="col-span-5 opacity-50">Наименование</div>
              <div className="col-span-3 opacity-50 md:text-start text-center">
                Количество
              </div>
              <div className="col-span-2 opacity-50">Цена</div>
            </div>
            {userStore.orderByIdProduct?.map((item: any) => (
              <OrderDetailsContent key={item?.id} item={item} />
            ))}
            <div className="mt-3 text-end">
              <div className="text-black inline-flex flex-col text-[12px] md:text-[14px]">
                <div className="mb-2 pb-1 border-b border-skin-base ps-20">
                  {/* <p className="flex justify-between mb-1">
                    <span className="me-8">Стоимость за товар: </span>
                    <span className="font-700">
                      <SubTotalPrice items={data} />
                    </span>
                  </p> */}
                  {typeof data?.discount === 'number' && (
                    <p className="flex justify-between mb-2">
                      <span className="me-8">Скидка: </span>
                      <span className="font-700">
                        <DiscountPrice discount={data?.discount} />
                      </span>
                    </p>
                  )}
                  {typeof data?.delivery_fee === 'number' && (
                    <p className="flex justify-between mb-2">
                      <span className="me-8">Доставка:</span>
                      <span className="font-700">
                        <DeliveryFee delivery={data?.delivery_fee} />
                      </span>
                    </p>
                  )}
                </div>
                <p className="flex justify-between ps-20 mb-2">
                  <span className="me-8">Итоговая стоимость с учетом скидки:</span>
                  <span className="font-700">
                    <TotalPrice items={data} />
                  </span>
                </p>
              </div>
            </div>
            {data?.payStatus === 0 && (
              <p style={{fontSize: '12px', fontStyle: 'italic'}} className="text-end mt-12">
                *Вы можете отменить заказ пока вы не произвели оплату по данному заказу
              </p>
            )}
            <div className="text-center mt-5 ewred">
              <span
                onClick={onClose}
                className="py-3 px-5 mb-2 cursor-pointer inline-block text-[12px] md:text-[14px] text-black font-700 bg-white rounded border border-solid border-[#DEE5EA] transition-all capitalize"
              >
                Закрыть заказ
              </span>
              {data?.payStatus === 0 && (
                <span
                  onClick={() => onClickRemovePhone()}
                  className="py-3 px-5 mb-2 cursor-pointer inline-block text-[12px] md:text-[14px] text-white font-700 bg-[#F35C5C] rounded border border-solid border-[#F35C5C]  hover:bg-white hover:text-black hover:border-[#DEE5EA] transition-all capitalize"
                >
                  Отменить заказ
                </span>
              )}
              <Link
                onClick={onClose}
                href={`/CompleteOrder?order_id=${data?.id}`}
                className="py-3 px-5 mb-2 cursor-pointer inline-block text-[12px] md:text-[14px] text-white font-700 bg-[#0085FF] rounded border border-solid border-[#0085FF]  hover:bg-white hover:text-black hover:border-[#DEE5EA] transition-all capitalize"

                >
                  Детально о заказе
              </Link>

            </div>
          </div>
        </>
      )}
    </>
  );
});

export default OrderDrawer;
