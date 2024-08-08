"use client"
import makeRequest from '@/api/makeRequest';
import { CartItem } from '@/types/Cart/cart.types';
// import {ProductsResponse} from "@/types/types";
import {AxiosResponse} from "axios";

class CartService {
  getUserCart() {
    return makeRequest<{products: CartItem[]}>({
      url: "/user/cart",
      method: "GET",
    });
  };
  clearUserCart() {
    return makeRequest<void>({
      url: "/user/cart",
      method: "DELETE",
    });
  };

  addProductToCart(productId: string) {
    return makeRequest<CartItem>({
      url: "/product/cart",
      method: "POST",
      data: {
        productId: productId,
        // userId: Cookies.get("access_token"),
      },
    });
  };

  minusProductCart( productId: string, isRemovingAll?: boolean ) {
    return makeRequest<CartItem>({
      url: "/product/cart",
      method: "DELETE",
      data: {
        productId:productId,
        isRemovingAll: isRemovingAll 
        }
    });
  };
}

export default new CartService();
