"use client"

import React, { useEffect } from "react";
import NotFoundBlock from "@/components/NotFoundBlock";

import cls from "./Product.module.scss";
import { ProductInfo } from "./ProductInfo/index";
import Skeleton from "../../components/GoodsCatalogue/GoodsBlock/Skeleton";

import { useSearchParams } from "next/navigation";
import { useStore } from "@/hooks/useStore";
// export type ProductState = {
//   imageUrl: string;
//   price: number;
//   articl: string;
//   name: string;
// };

const Product: React.FC = () => {

  const store = useStore();
  const productStore = store.product;
  // const [chand, setChand] = React.useState<Product | null>(null);
  const searchParams = useSearchParams();
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

  // useEffect(() => {
  //   productStore.getDetProduct({
  //     ProductId: (searchParams.get('id') as string) ?? '',
  //   });
  // }, [searchParams.get('id')]);

  // if (!searchParams.get('id')) {
    // Если продукт пустой, тоесть еще загружается , то не показываем , когда прогрузится тогда уже и покажем
    return (
      <NotFoundBlock />
  );
};

export default Product;
