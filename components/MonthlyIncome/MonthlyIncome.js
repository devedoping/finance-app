import React from 'react';
import Card from "@/components/Card/Card";
import IncomeRow from "@/components/MonthlyIncome/IncomeRow/IncomeRow";
import {headers} from "next/headers";
import NewIncome from "@/components/MonthlyIncome/NewIncome/NewIncome";
import ClientStore from "@/components/MonthlyIncome/ClientStore/ClientStore";

const MonthlyIncome = async () => {
    const incomeResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/income`, {
        headers: {
            Cookie: headers().get('Cookie') || "",
        }
    });

    const incomes = await incomeResponse.json();

    const totalIncome = incomes.reduce((totalIncome, income) => totalIncome + parseInt(income.amount), 0);

    return (
        <Card title="درآمدها">
            {incomes.map(income => (
                <IncomeRow key={`income-row-${income.id}`} income={income} />
            ))}

            <NewIncome />
            <ClientStore totalIncome={totalIncome} />
        </Card>
    );
};

export default MonthlyIncome;
