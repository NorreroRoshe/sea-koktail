'use client'
import { useEffect } from "react";
import { useStore } from "./useStore";
import {observer} from "mobx-react";

export const useCart = () => {

  const store = useStore();
  const cartStore = store.cart;
  const authStore = store.auth;
  
  const isAuth = !!authStore.userId;
    
  //   useEffect(() => {
  //   if (isAuth) {
  //     cartStore.clearCart();
  //   if (typeof window !== 'undefined') {
  //     localStorage.removeItem("cart");
  //   }
  //   }
  // }, [isAuth]);

  const handleAddToCart = (productId: string) => {
    if (isAuth) {
      cartStore.addProductToCart(productId);
      return;
    }
    cartStore.addLocalItem(productId);
  };

  const handleDeleteFromCart = (productId: string) => {
    if (isAuth) {
      cartStore.minusProductCart(productId, false);
      return;
    }
    cartStore.minusItemFromCart(productId);
  };

  const handleDeleteFullProductCart = (productId: string) => {
    if (isAuth) {
      cartStore.minusProductCart(productId, true );
      return;
    }
    cartStore.deleteProductFromCart(productId);
  };

  const handleClearCart = () => {
    if (isAuth) {
      cartStore.clearUserCart();
      return;
    }
    cartStore.clearCart();
  };

  return {
    // isLoading: isLoadingAdd || isLoadingDelete || isLoadingClear,            //Правильно ли я сделал ?
    isLoading: cartStore.isLoading,
    addToCart: handleAddToCart,
    minusFromCart: handleDeleteFromCart,
    deleteFromCart: handleDeleteFullProductCart,
    clearCart: handleClearCart,
  };
};
