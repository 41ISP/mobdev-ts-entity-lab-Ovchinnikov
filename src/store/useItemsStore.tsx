import { create } from "zustand";

import { api } from "../api";
import type { IItem, IStrapiResponse } from "../types";

interface IItemStore {
    items: IStrapiResponse<IItem[]> | undefined,
    getGames: () => void,

}

export const useItemStore = create<IItemStore>((set) => ({
     items: undefined,
     getGames: async () => {
        try {
            const res = await api.getItems()
            set({ items : res })
        } catch (error) {
            console.error(error)
        }
     }
}))