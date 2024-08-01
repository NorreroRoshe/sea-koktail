"use client"
import makeRequest from '@/api/makeRequest';
import { FavoritesItem } from '@/types/Favorites/favorites.types';
import { Product } from '@/types/Product/product.types';
// import {ProductsResponse} from "@/types/types";
import {AxiosResponse} from "axios";

class FavoritesService {

  getUserFavorites() {
    return makeRequest<{products: FavoritesItem[]}>({
      url: "/user/favourites",
      method: "GET",
    });
  };
  addFavoriteProd(productId: string) {
    return makeRequest<Product>({
      url: "/product/favourite",
      method: "POST",
      data: {productId: productId},
    });
  };
  minusFavorite(productId: string) {
    return makeRequest<Product> ({
      url: "/product/favourite",
      method: "DELETE",
      data: {productId: productId},
    });
  };
}

export default new FavoritesService();
