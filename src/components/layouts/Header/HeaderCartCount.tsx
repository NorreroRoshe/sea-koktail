'use client'
import Link from "next/link";
import Carzinka from "../../assets/img/social_icon/cart-4-svgrepo-com.svg";
import { useStore } from "@/hooks/useStore";

function HeaderCartCount() {

  const store = useStore();
  const cartStore = store.cart;

  const totalPrice = cartStore.totalPrice;
  const items = cartStore.cartItems;

  
  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

  return (
    <Link href="/Cart" className="header__signin-desc button button--cart">
      <img src={Carzinka} alt="Иконка корзины" className="button--cart_icon" />
      <span>{totalCount}</span>
      <div className="button__delimiter"></div>
      <span>{totalPrice} ₽</span>
    </Link>
  );
}

export default HeaderCartCount;
