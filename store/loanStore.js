import { create } from "zustand";

export const useLoanStore = create((set) => ({
    totalDebt: 0,
    setTotalDebt: (amount) => set({ totalDebt: amount }),
    installments: [],
    setInstallments: (installments) => set({ installments: installments }),
}));
