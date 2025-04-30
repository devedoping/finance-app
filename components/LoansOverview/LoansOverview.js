import React from 'react';
import Row from "@/components/Card/Row";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import Card from "@/components/Card/Card";
import PayButton from "@/components/LoansOverview/PayButton/PayButton";
import LoanRow from "@/components/LoansOverview/LoanRow/LoanRow";
import NewLoan from "@/components/LoansOverview/NewLoan/NewLoan";
import {headers} from "next/headers";
import ClientStore from "@/components/LoansOverview/ClientStore/ClientStore";

const LoansOverview = async () => {
    const installmentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/installment`, {
        headers: {
            Cookie: headers().get('Cookie') || "",
        }
    });

    const installments = await installmentResponse.json();

    const totalDebt = installments.reduce((totalDebt, installment) => totalDebt + parseInt(installment.loan.amount), 0);

    return (
        <Card title="اقساط">
            {installments.map((installment) => (
                <LoanRow key={`loan-row-${installment.id}`} installment={installment} />
            ))}

            <NewLoan />
            <ClientStore totalDebt={totalDebt} installments={installments} />
        </Card>
    );
};

export default LoansOverview;
