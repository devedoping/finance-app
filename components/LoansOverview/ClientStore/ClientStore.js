"use client";
import React, {useEffect} from 'react';
import {useLoanStore} from "@/store/loanStore";

const ClientStore = ({totalDebt, installments}) => {
    const { setTotalDebt, setInstallments } = useLoanStore();

    useEffect(() => {
        setTotalDebt(totalDebt);
    }, [totalDebt, setTotalDebt]);

    useEffect(() => {
        setInstallments(installments);
    }, [installments, setInstallments]);

    return null;
};

export default ClientStore;
