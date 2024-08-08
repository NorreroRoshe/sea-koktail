"use client"
import FavoritesService from '@/api/Favorites/FavoritesService';
import { FavoritesItem } from '@/types/Favorites/favorites.types';
import { Product } from '@/types/Product/product.types';
import { IFavoritesStore } from '@/types/Stores/IFavoritesStore';
import { makeAutoObservable } from 'mobx';
import Cookies from 'js-cookie';

const KEY = "favorites";

const delFromArr = <T>(index: number, array: T[]) => [
  ...array.slice(0, index),
  ...array.slice(index + 1, array.length),
];

export class FavoritesStore implements IFavoritesStore {
  favoriteItems: FavoritesItem[] = [];
  ids: string[] = [];
  isLoading: boolean = false;


  constructor() {
    makeAutoObservable(this);
    if (typeof window !== 'undefined') {
      this.ids = JSON.parse(Cookies.get('favorites') ?? '[]')
    }
  }

  addFavorite(addFavoriteProd: string) {
    if (this.ids.includes(addFavoriteProd)) return;
    const ids = this.ids.concat(addFavoriteProd);
    this.ids = ids;
    if (typeof window !== 'undefined') {
      Cookies.set(KEY, JSON.stringify(ids));
    }
  };

  getFavorite(getFavoriteProd: FavoritesItem) {
    this.favoriteItems = this.favoriteItems.concat(getFavoriteProd);
  };
  removeFavorite(removeFavoriteProd: string) {
    const ind = this.favoriteItems.findIndex((it) => it?.id === removeFavoriteProd);
    this.favoriteItems = delFromArr(ind, this.favoriteItems);
    const idsInd = this.ids.findIndex((it) => it === removeFavoriteProd);
    const ids = delFromArr(idsInd, this.ids);
    this.ids = ids;
    if (typeof window !== 'undefined') {
      Cookies.set(KEY, JSON.stringify(ids));
    }
  };
  clearItems() {
    this.favoriteItems = [];
    this.ids = [];
    if (typeof window !== 'undefined') {
      Cookies.set(KEY, `[]`);
    }
  };

  async getUserFavorites() {
    this.isLoading = true;
    const response = await FavoritesService.getUserFavorites();

    if ('data' in response) {
      this.isLoading = false;
    if (typeof window !== 'undefined') {
      Cookies.remove("favorites");
    }
      this.ids = response.data.products?.map((item: Product) => item.id);
      this.favoriteItems = response.data.products;
    }
  };


  async addFavoriteProd(productId: string) {
    this.isLoading = true;
    const response = await FavoritesService.addFavoriteProd(productId);

    if ('data' in response) {
      this.isLoading = false;
      const ids = this.ids.concat(productId);
      this.ids = ids;
    }
  };




  async minusFavorite(productId: string) {
    this.isLoading = true;
    const response = await FavoritesService.minusFavorite(productId);

    if ('data' in response) {
      this.isLoading = false;
      const ind = this.ids.findIndex((item) => productId === item);
      const ids = delFromArr(ind, this.ids);
      this.ids = ids;
      const indItems = this.favoriteItems.findIndex((item) => productId === item.id);
      const items = delFromArr(indItems, this.favoriteItems);
      this.favoriteItems = items;
    }
  };
};