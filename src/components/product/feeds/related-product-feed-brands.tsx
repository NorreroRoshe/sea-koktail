'use client'
import React, { useEffect, useState } from "react";
import ProductsCarousel from '@/components/product/products-carousel';
import { useStore } from "@/hooks/useStore";
import {observer} from "mobx-react";

interface RelatedProductsProps {
  carouselBreakpoint?: {} | any;
  className?: string;
  uniqueKey?: string;
  id?: string;
  sectionHeading: string;
}

const RelatedProductFeedBrand: React.FC<RelatedProductsProps> = observer (({
  carouselBreakpoint,
  className,
  uniqueKey = 'related-product-popup',
  id,
  sectionHeading
}) => {

  const store = useStore();
  const productStore = store.product;
  const brandStore = store.brand;
  
  const brandId = id;


  const brand = brandStore.brands.find((col) => col.id === brandId);

  useEffect(() => {
    productStore.getBrandProducts({
      BrandsId: brandId,
      From: 0,
      Count: 8,
    });
  }, [brand, brandId]);


  console.log(brandId,'brandId')

  return (
    <ProductsCarousel
      sectionHeading={sectionHeading}
      categorySlug={`/Brands/${brandId}`}
      className={className}
      products={productStore?.brandItems}
      loading={productStore.isLoading}
      // error={error?.message}
      // limit={LIMITS.RELATED_PRODUCTS_LIMITS}
      uniqueKey={uniqueKey}
      carouselBreakpoint={carouselBreakpoint}
    />
  );
});

export default RelatedProductFeedBrand;