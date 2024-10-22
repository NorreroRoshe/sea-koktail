"use client"
import { CartItem, ICartLocalState } from "../Cart/cart.types";

export interface ICartStore {
  cartItems: CartItem[];
  totalCount: number;
  totalPrice: number;
  totalDiscountPrice: number;
  cart: ICartLocalState;
  isLoading: boolean;
  saledPrice: number;
  salePercent: string;
  cartCount: number;

  addLocalItem: (localItemProd: string) => void;
  addItem: (addItemProd: CartItem) => void;
  deleteProductFromCart: (deleteProductFromCartProd: string) => void;
  minusItemFromCart: (minusItemFromCartProd: string) => void;
  removeItem:(removeItemProd: string) => void;
  clearCart: () => void;
  getUserCart: () => void;
  getUserLocalCart: () => void;
  clearUserCart: () => void;
  addProductToCart: (productId: string) => void;
  minusProductCart: (productId: string, isRemovingAll?: boolean) => void;
  basketReset: () => void;

  
}