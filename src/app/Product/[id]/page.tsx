"use client"
// Здесь детальная страница по пути Product/:id
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import cls from '../Product.module.scss';
import { ProductInfo } from '../ProductInfo/index';

import { useParams, usePathname, useSearchParams } from 'next/navigation';
import ProdSkeleton from '../ProductInfo/ProdSkeleton';
import ProductPopup from '@/components/product/product-popup';
import DownloadApps from '@/components/common/download-apps';
import { useStore } from '@/hooks/useStore';
import {observer} from "mobx-react";

const ProductDetail: React.FC = () => {
  // const [chand, setChand] = React.useState<Product | null>(null);

  const searchParams = useSearchParams();
  const Params = useParams();
  const store = useStore();
  const productStore = store.product;
  

  // const navigate = useNavigate();

  // React.useEffect(() => {
  //   async function fetchProduct() {
  //     try {
  //       const { data } = await axios.get('http://194.58.120.23/api' + id);
  //       setChand(data);
  //     } catch (error) {
  //       alert('Ошибка при получении люстр!');
  //       navigate('/');
  //     }
  //   }
  //   fetchProduct();
  // }, []);

  const [{ data: prodata }, setState] = useState<any>([]); //дата не всегда заполнялась , просто влязи стейт и засунули в него ответ с сервером

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const id = searchParams.get('id');
        const id = Params.id;
        
        const response = await productStore.getDetProduct({
          ProductId: `${id}`,
        });
        setState(response as any);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchParams.get('id')]);

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
      <div className={cls.container}>
        <div className={cls.product_info}>
          {/* {isLoading && <div>Идет загрузка ...</div>} */}
          {productStore.isLoading && <div>{[...new Array(1)].map((_, index) => (
            <ProdSkeleton key={index} />
          ))}</div>}
          {prodata && <ProductInfo detProduct={prodata} />}
          {/* {prodata && <ProductPopup popupProduct={prodata}/>} */}
        </div>
      </div>
      <div style={{borderBottom: '1px solid #0c69c7'}}>
        <DownloadApps />
      </div>
    </>
  );
};

export default ProductDetail;
