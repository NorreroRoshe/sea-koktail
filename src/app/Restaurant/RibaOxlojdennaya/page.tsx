"use client"
import React, { useEffect } from "react";
import { GoodsCatalogue } from "@/components/GoodsCatalogue/GoodsCatalogue";
import { sitePathCategory } from "@/settings/site-path-cathegory";
import cls from "../ProductiOnline.module.scss";
import Breadcrumb from '@/components/ui/breadcrumb';
const CategoryPage: React.FC = () => {
  return (
    <div className={`${cls.container} ${cls.chapter__container}`}>
      <div className={cls.chapter__mt}>
        <GoodsCatalogue sitePathCategory={sitePathCategory[8]} />
      </div>
    </div>
  );
};

export default CategoryPage;
