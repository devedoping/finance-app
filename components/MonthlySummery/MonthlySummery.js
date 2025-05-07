"use client";
import React from 'react';
import Card from "@/components/Card/Card";
import Row from "@/components/Card/Row";
import {useIncomeStore} from "@/store/incomeStore";
import {useLoanStore} from "@/store/loanStore";

const MonthlySummery = () => {
    const { totalIncome, secure } = useIncomeStore();
    const { totalDebt } = useLoanStore();
    const monthlyBalance = totalIncome - totalDebt;

    return (
        <Card title="خلاصه ماه">
            <Row>
                <div className="text-slate-400">مجموع درآمد</div>
                <div
                    className={`text-black font-medium ${secure ? 'blur-sm' : ''}`}>{totalIncome.toLocaleString()} تومان
                </div>
            </Row>
            <Row>
                <div className="text-slate-400">مجموع بدهی‌ها</div>
                <div className="text-red-600 font-medium">{totalDebt.toLocaleString()} تومان</div>
            </Row>
            <hr className="border-black mb-6"/>
            <Row>
                <div className="text-black font-medium">مجموع</div>
                <div className={`${monthlyBalance >= 0 ? `text-green-600` : `text-red-600`} ${secure ? 'blur-sm' : ''} font-medium`}><span dir="ltr">{(monthlyBalance).toLocaleString()}</span> تومان</div>
            </Row>
        </Card>
    );
};

export default MonthlySummery;
