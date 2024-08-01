"use client"
import { FavoritesItem } from "../Favorites/favorites.types";

export interface IFavoritesStore {
  favoriteItems: FavoritesItem[];
  ids: string[];
  isLoading: boolean;
  
  addFavorite: (productId: string) => void;
  minusFavorite: (productId: string) => void;
  getUserFavorites: () => void;
  clearItems: () => void;
  removeFavorite: (removeFavoriteProd: string) => void;
  getFavorite: (getFavoriteProd: FavoritesItem) => void;
  addFavoriteProd: (addFavoriteProd: string) => void;
}