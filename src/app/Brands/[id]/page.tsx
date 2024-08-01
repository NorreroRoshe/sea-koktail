"use client"


import React, { useEffect, useState } from "react";
import cls from "../BrandsPage.module.scss";
import { ProdBlock } from "@/components/GoodsCatalogue/GoodsBlock/ProdBlock";
import { Pagination } from "@/components/Pagination";
import { COUNT_PER_PAGE } from "@/components/Pagination/pagination-lib";
import { useStore } from "@/hooks/useStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CollectionsOfBrands } from "@/components/CollectionsOfBrands/CollectionsOfBrands";
import {observer} from "mobx-react";

const BrandPage: React.FC = observer(() => {

  const pathname = usePathname();
  const store = useStore();
  const cartStore = store.cart;
  const productStore = store.product;
  const brandStore = store.brand;

  const [page, setPage] = useState(0);
  const searchParams = useSearchParams();

  const brandId = pathname.split('/').pop();

  const brand = brandStore.brands.find((br) => br.id === brandId);

  // useEffect(() => {
  //   productStore.getBrandProducts({
  //     BrandId: brandId,
  //     From: page * COUNT_PER_PAGE,
  //     Count: COUNT_PER_PAGE,
  //   });
  // }, [brandId, brand, page]);


  return (
    <div className={`${cls.container} ${cls.brand__container}`}>
      <div className={cls.brand__mt}>
        {/* <h2 className={cls.brand__title}>Коллекции бренда {brand?.name}</h2> */}
        <CollectionsOfBrands />

        {/* <ul style={{ display: "flex", flexWrap: "wrap" }}>
          {productStore?.items.map((prod) => (
            <ProdBlock key={prod.id} product={prod} />
          ))}
        </ul>
        {(productStore?.totalCount ?? 0) >= COUNT_PER_PAGE && (
          <Pagination
            count={productStore?.totalCount || 0}
            changePage={(num: number) => setPage(num - 1)}
            isLoading={productStore.isLoading}
          />
        )} */}
      </div>
    </div>
  );
});

export default BrandPage;
