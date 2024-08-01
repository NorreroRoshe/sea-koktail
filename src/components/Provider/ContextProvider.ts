import store from "@/store/store";
import { IRootStore } from "@/types/Stores/IRootStore";
import { createContext } from "react";

export interface AppContextInterface {
  store: IRootStore;
}

export const Context = createContext<AppContextInterface>({ store: store });