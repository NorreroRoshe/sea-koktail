'use client'
import DishesPopup from './dishes-popup';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProdSkeleton from '@/app/Product/ProductInfo/ProdSkeleton';
import { useModalState } from '../common/modal/modal.context';
import { useStore } from '@/hooks/useStore';

const DishPrePopup: React.FC = () => {

  const store = useStore();
  const productStore = store.product;

  const { data } = useModalState();
  const [{ data: prodata }, setState] = useState<any>({}); //дата не всегда заполнялась , просто влязи стейт и засунули в него ответ с сервером

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = data?.productId; // Получить `productId` из контекста
        if (id) {
          const response = await productStore.getDetProduct({
            ProductId: id,
          });
          setState(response as any);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, [data]);

  if (productStore.isLoading) {
    // Если продукт пустой, тоесть еще загружается , то не показываем , когда прогрузится тогда уже и покажем
    return (
      <div>
        {[...new Array(1)].map((_, index) => (
          <ProdSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      {prodata && <DishesPopup popupProduct={prodata} />}
    </>
  );
};

export default DishPrePopup;
