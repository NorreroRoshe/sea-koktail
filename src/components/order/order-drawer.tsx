"use client"
import React, { useEffect, useState } from 'react';
import { OrderDetailsContent } from './order-details-content';
import { formatAddress } from '@/utils/format-address';
import OrderStatus from './order-status';
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

const OrderDrawer: React.FC = () => {
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
            <div className="text-[14px] opacity-70 mb-3 text-skin-base">
              Адрес,дата и время доставки:
            </div>
            <div className="rounded border border-solid min-h-[90px] bg-skin-two p-4 border-skin-two text-[12px] md:text-[14px]">
              <p className="text-skin-base opacity-70">
                {/* {formatAddress(data?.address)} */}
                {data?.address}
                <br/>
                <br/>
                {formattedDate}
              </p>
            </div>
            {/* <OrderStatus status={data?.status?.serial} /> */}
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
                  <p className="flex justify-between mb-1">
                    <span className="me-8">Стоимость за товар: </span>
                    <span className="font-700">
                      <SubTotalPrice items={data} />
                      {/* <SubTotalPrice items={data?.products} /> */}
                    </span>
                  </p>
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
                  <span className="me-8">Итоговая стоимость:</span>
                  <span className="font-700">
                    <TotalPrice items={data} />
                  </span>
                </p>
              </div>
            </div>
            <p style={{fontSize: '12px', fontStyle: 'italic'}} className="text-end mt-12">
              *Вы можете отменить заказ пока вы не произвели оплату по данному заказу
            </p>
            <div className="text-end mt-5">
              <span
                onClick={onClose}
                className="py-3 px-5 cursor-pointer inline-block text-[12px] md:text-[14px] text-black font-700 bg-white rounded border border-solid border-[#DEE5EA] me-4 hover:bg-[#F35C5C] hover:text-white hover:border-[#F35C5C] transition-all capitalize"
              >
                Закрыть заказ
              </span>
              {data.payStatus === 0 && (
                <span
                  onClick={() => onClickRemovePhone()}
                  className="py-3 px-5 cursor-pointer inline-block text-[12px] md:text-[14px] text-white font-700 bg-[#F35C5C] rounded border border-solid border-[#F35C5C]  hover:bg-white hover:text-black hover:border-[#DEE5EA] transition-all capitalize"
                >
                  Отменить заказ
                </span>
              )}

            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDrawer;
