import React from 'react';
import MonthlySummery from "@/components/MonthlySummery/MonthlySummery";
import MonthlyIncome from "@/components/MonthlyIncome/MonthlyIncome";
import LoansOverview from "@/components/LoansOverview/LoansOverview";
import CalendarContainer from "@/components/Calendar/CalendarContainer";

const Page = () => {
    return (
        <div className="pt-8 flex gap-8">
            <div className="w-3/4">
                <CalendarContainer />
            </div>
            <div className="w-1/4">
                <LoansOverview />
                <MonthlySummery />
                <MonthlyIncome />
            </div>
        </div>
    );
};

export default Page;
