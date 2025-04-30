import { create } from "zustand";

export const useIncomeStore = create((set) => ({
    totalIncome: 0,
    setTotalIncome: (amount) => set({ totalIncome: amount }),
}));
