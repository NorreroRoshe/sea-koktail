"use client"

import { AppContextInterface, Context } from '@/components/Provider/ContextProvider';
import { IRootStore } from '@/types/Stores/IRootStore';
import { useContext } from 'react';


type TUseStore = () => IRootStore;

export const useStore: TUseStore = () => {
  const context = useContext(Context) as AppContextInterface;
  return context.store;
};