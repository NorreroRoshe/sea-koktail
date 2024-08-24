"use client"
import { useOrderQuery } from '@/framework/basic-rest/order/get-order';
import usePrice from '@/framework/basic-rest/product/use-price';
import { OrderItem } from '@/framework/basic-rest/types';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import Heading from '@/components/ui/heading';
import { IDataGetOrderByIdRes, OrderByIdProduct } from '@/types/Auth/auth.dtos';
import {observer} from "mobx-react";
import { useStore } from '@/hooks/useStore';



const OrderItemCard = observer(({ product }: { product: OrderByIdProduct }) => {


  const store = useStore();
  const userStore = store.auth;


  const itemTotalPrice = Number(product?.cost) * product.count;

  // const { price: itemTotal } = usePrice({
  //   amount: product.cost * product.count,
  //   currencyCode: 'RUB',
  // });
  return (
    <tr
      className="border-b font-normal border-skin-base last:border-b-0"
      key={product.id}
    >
      <td className="p-4">
        {product.name} * {product.count}
      </td>
      <td className="p-4 text-end">{itemTotalPrice}</td>
    </tr>
  );
});


const OrderDetails: React.FC<{ orderi: IDataGetOrderByIdRes,className?: string }> = observer(({
  className = 'pt-10 lg:pt-12',
  orderi
}) => {

  const store = useStore();
  const userStore = store.auth;

  console.log(orderi,'orderorderorder')
  
  const { t } = useTranslation('common');

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // const { data: order, isLoading } = useOrderQuery(id?.toString()!);
  // const { price: subtotal } = usePrice(
  //   order && {
  //     amount: order.total,
  //     currencyCode: 'RUB',
  //   }
  // );
  // const { price: total } = usePrice(
  //   order && {
  //     amount: order.shipping_fee
  //       ? order.total + order.shipping_fee
  //       : order.total,
  //     currencyCode: 'RUB',
  //   }
  // );
  // const { price: shipping } = usePrice(
  //   order && {
  //     amount: order.shipping_fee,
  //     currencyCode: 'RUB',
  //   }
  // );
  if (userStore.isLoading) return <p>Loading...</p>;

  return (
    <div className={className}>
      <Heading variant="heading" className="mb-6 xl:mb-7">
        {/* {t('text-order-details')}: */}
        Детали заказа:
      </Heading>
      <table className="w-full text-skin-base font-semibold text-sm lg:text-base">
        <thead>
          <tr>
            <th className="bg-skin-secondary p-4 text-start first:rounded-ts-md w-1/2">
              {/* {t('text-product')} */}
              Продукт
            </th>
            <th className="bg-skin-secondary p-4 text-end last:rounded-te-md w-1/2">
              {/* {t('text-total')} */}
              Итог
            </th>
          </tr>
        </thead>
        <tbody>
          {orderi?.products.map((product, index) => (
            <OrderItemCard key={index} product={product} />
          ))}
        </tbody>
        <tfoot>
          <tr className="odd:bg-skin-secondary">
            <td className="p-4 italic">
              {/* {t('text-sub-total')}: */}
              Промежуточный итог :
            </td>
            <td className="p-4 text-end">{orderi?.totalCost}</td>
          </tr>





          <tr className="odd:bg-skin-secondary">
            <td className="p-4 italic">
              {/* {t('text-shipping')}: */}
              Дата и время доставки :
            </td>
            <td className="p-4 text-end">
              30 августа 2024г. в 16:00
            </td>
          </tr>
          <tr className="odd:bg-skin-secondary">
            <td className="p-4 italic">
              {/* {t('text-shipping')}: */}
              Адрес доставки :
            </td>
            <td className="p-4 text-end">
              г. Москва, ул. Ясная д.3, кв. 62
            </td>
          </tr>





          <tr className="odd:bg-skin-secondary">
            <td className="p-4 italic">
              {/* {t('text-shipping')}: */}
              Цена доставки :
            </td>
            <td className="p-4 text-end">
              {/* {shipping} */}450 ₽
              <span className="text-[13px] font-normal ps-1.5 inline-block">
                по фиксированной ставке
              </span>
            </td>
          </tr>
          <tr className="odd:bg-skin-secondary">
            <td className="p-4 italic">
              {/* {t('text-total')}: */}
              Общий итог с учетом доставки :
            </td>
            <td className="p-4 text-end">{orderi?.totalCost}</td>
          </tr>
          <tr className="odd:bg-skin-secondary">
            <td className="p-4 italic">
              {/* {t('text-note')}: */}
              Комментарий :
            </td>
            <td className="p-4 text-end">
              {orderi?.description ? (
                orderi.description
              ) : (
                <i className="text-red-600 italic">*Без комментариев*</i>
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
});

export default OrderDetails;
