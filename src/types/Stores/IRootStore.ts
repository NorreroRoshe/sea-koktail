"use client"
import { IAuthStore } from "./IAuthStore";
import { IBrandStore } from "./IBrandStore";
import { ICartStore } from "./ICartStore";
import { ICollectionStore } from "./ICollectionStore";
import { IFavoritesStore } from "./IFavoritesStore";
import { IProductStore } from "./IProductStore";

export interface IRootStore { 
  brand: IBrandStore;
  collection: ICollectionStore;
  auth: IAuthStore;
  product: IProductStore;
  favorites: IFavoritesStore;
  cart: ICartStore;
}