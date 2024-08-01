"use client"
import { IBrandStore } from "@/types/Stores/IBrandStore";
import { IRootStore } from "@/types/Stores/IRootStore";
import { makeAutoObservable } from 'mobx';
import { BrandStore } from "./brandStore";
import { ICollectionStore } from "@/types/Stores/ICollectionStore";
import { CollectionStore } from "./collectionStore";
import { IAuthStore } from "@/types/Stores/IAuthStore";
import { AuthStore } from "./authStore";
import { IProductStore } from "@/types/Stores/IProductStore";
import { ProductStore } from "./productStore";
import { IFavoritesStore } from "@/types/Stores/IFavoritesStore";
import { ICartStore } from "@/types/Stores/ICartStore";
import { FavoritesStore } from "./favoritesStore";
import { CartStore } from "./cartStore";

class Store implements IRootStore {
  brand: IBrandStore;
  collection: ICollectionStore;
  auth: IAuthStore;
  product: IProductStore;
  favorites: IFavoritesStore;
  cart: ICartStore;

  constructor() {
    this.brand = new BrandStore();
    this.collection = new CollectionStore();
    this.auth = new AuthStore();
    this.product = new ProductStore();
    this.favorites = new FavoritesStore();
    this.cart = new CartStore();
    
    makeAutoObservable(this);
  }

}

const store = new Store();
export default store;