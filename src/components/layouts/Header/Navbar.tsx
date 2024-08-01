'use client'
import Link from "next/link";
import cls from "./Header.module.scss";
import { useStore } from "@/hooks/useStore";

function Navbar() {


  const store = useStore();
  const productStore = store.product
  
  const handleSetSale = () => {
    productStore.clearFilters();
    productStore.setIsSale(true);
  };



  return (
    <div className={cls.new_container}>
      <div className={cls.glav_menu__items}>
        <Link href="/Brands" className={cls.glav_menu__item}>
          Бренды
        </Link>
        <Link href="/AboutUs" className={cls.glav_menu__item}>
          О нас
        </Link>
        {/* <span className={cls.glav_menu__item_text}>•</span> */}
        <Link
          href={`/Chapter/?IsSale=true`}
          onClick={handleSetSale}
          className={`${cls.glav_menu__item} ${cls.glav_menu__item_outlet}`}
        >
          Outlet
        </Link>
        <Link href="/Factory" className={cls.glav_menu__item}>
          Производство
        </Link>
        <Link href="/Collaboration" className={cls.glav_menu__item}>
          Сотрудничество
        </Link>
        <Link href="/Contacts" className={cls.glav_menu__item}>
          Контакты
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
