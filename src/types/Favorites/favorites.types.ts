"use client"
import { Product } from "../Product/product.types";

export type FavoritesItem = Product;

export interface FavoritesSliceState {
  items: FavoritesItem[];
  ids: string[];
}
