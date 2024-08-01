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

const RelatedProductFeed: React.FC<RelatedProductsProps> = observer (({
  carouselBreakpoint,
  className,
  uniqueKey = 'related-product-popup',
  id,
  sectionHeading
}) => {

  const store = useStore();
  const productStore = store.product;
  const collectionStore = store.collection;
  
  const collectionId = id;

  


  const collection = collectionStore.collections.find((col) => col.id === collectionId);

  useEffect(() => {
    productStore.getCollectionProducts({
      CollectionsId: collectionId,
      From: 0,
      Count: 8,
    });
  }, [collection, collectionId]);


  return (
    <ProductsCarousel
      sectionHeading={sectionHeading}
      categorySlug={`/Collections/${collectionId}`}
      className={className}
      products={productStore?.collectionItems}
      loading={productStore.isLoading}
      // error={error?.message}
      // limit={LIMITS.RELATED_PRODUCTS_LIMITS}
      uniqueKey={uniqueKey}
      carouselBreakpoint={carouselBreakpoint}
    />
  );
});

export default RelatedProductFeed;