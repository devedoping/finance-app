"use client";
import React from 'react';
import {useRouter} from "next/navigation";

const PayButton = ({ isPaid, installmentId }) => {
    const router = useRouter();
    const handlePaying = async (id) => {
        const updateResponse = await fetch(`/api/installment/${installmentId}`, {
            method: "PATCH",
        });

        if(updateResponse?.ok) {
            router.refresh();
        }
    }
    return (
        <button onClick={handlePaying}
            className={`${isPaid ? `bg-emerald-900 rounded-full` : `bg-emerald-500 hover:bg-emerald-600 rounded` } text-white text-xs py-1 px-3 ml-2 transition-all`}>
            {isPaid ? "پرداخت‌شده" : "پرداخت"}
        </button>
    );
};

export default PayButton;
