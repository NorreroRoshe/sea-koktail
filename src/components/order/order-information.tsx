"use client"
import { IoCheckmarkCircle } from 'react-icons/io5';
import OrderDetails from '@/components/order/order-details';
import { useOrderQuery } from '@/framework/basic-rest/order/get-order';
import { useSearchParams } from 'next/navigation';
import usePrice from '@/framework/basic-rest/product/use-price';
import { useTranslation } from 'next-i18next';

export default function OrderInformation() {
  const searchParams = useSearchParams();
  const { t } = useTranslation('common');
  const id = searchParams.get('id');
  const { data, isLoading } = useOrderQuery(id?.toString()!);
  const { price: total } = usePrice(
    data && {
      amount: data.shipping_fee ? data.total + data.shipping_fee : data.total,
      currencyCode: 'RUB',
    }
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="xl:px-32 2xl:px-44 3xl:px-56 py-16 lg:py-20">
      <div className="border border-skin-base bg-skin-secondary px-4 lg:px-5 py-4 rounded-md flex items-center justify-start text-skin-base text-sm md:text-base mb-6 lg:mb-8">
        <span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-skin-primary bg-opacity-20 flex items-center justify-center flex-shrink-0" style={{background: '#02b29033'}}>
          <IoCheckmarkCircle className="w-5 h-5" style={{color: '#02b290'}}/>
        </span>
        {/* {t('text-order-received')} */}
        Спасибо. Ваш заказ получен.
      </div>

      <ul className="border border-skin-base bg-skin-secondary rounded-md flex flex-col md:flex-row mb-7 lg:mb-8 xl:mb-10">
        <li className="text-skin-base font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-skin-two px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-xs block text-skin-muted font-normal leading-5">
            {/* {t('text-order-number')}: */}
            НОМЕР ЗАКАЗА :
          </span>
          {data?.tracking_number}
        </li>
        <li className="text-skin-base font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-skin-muted font-normal leading-5">
            {/* {t('text-date')}: */}
            ДАТА :
          </span>
          22 апреля 2024
        </li>
        <li className="text-skin-base font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-skin-muted font-normal leading-5">
            {/* {t('text-email')}: */}
            Почта :
          </span>
          {data?.customer.email}
        </li>
        <li className="text-skin-base font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-skin-muted font-normal leading-5">
            {/* {t('text-total')}: */}
            Итоговая сумма:
          </span>
          {total}
        </li>
        <li className="text-skin-base font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-skin-muted font-normal leading-5">
            {/* {t('text-payment-method')}: */}
            СПОСОБ ОПЛАТЫ :
          </span>
          {/* {data?.payment_gateway} */}
          Оплата по СБП.
        </li>
      </ul>

      <p className="text-skin-base text-sm md:text-base mb-8">
        {/* {t('text-pay-cash')} */}
          Статус оплаты: Оплата не прошла !
      </p>

      <OrderDetails />
    </div>
  );
}
