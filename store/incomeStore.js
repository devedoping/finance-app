import {create} from "zustand";

export const useIncomeStore = create((set) => ({
    totalIncome: 0,
    setTotalIncome: (amount) => set({totalIncome: amount}),
    secure: true,
    setSecure: (secure) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem("secure", secure);
        }
        set({secure});
    },
}));