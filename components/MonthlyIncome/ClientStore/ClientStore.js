"use client";
import React, {useEffect} from 'react';
import {useIncomeStore} from "@/store/incomeStore";

const ClientStore = ({totalIncome}) => {
    const { setTotalIncome } = useIncomeStore();

    useEffect(() => {
        setTotalIncome(totalIncome);
    }, [totalIncome, setTotalIncome]);

    return null;
};

export default ClientStore;
