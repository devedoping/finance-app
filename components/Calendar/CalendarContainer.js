"use client";
import React, {useEffect, useState} from 'react';
import Card from "@/components/Card/Card";
import CalendarNavigation from "@/components/Calendar/CalendarNavigation";
import Calendar from "@/components/Calendar/Calendar";
import jalaali from "jalaali-js";
import {useRouter} from "next/navigation";
import Cookie from "js-cookie";

const CalendarContainer = () => {
    const router = useRouter();
    const now = new Date();
    const jalaliDate = jalaali.toJalaali(now);
    const [selectedYear, setSelectedYear] = useState(jalaliDate.jy);
    const [selectedMonth, setSelectedMonth] = useState(jalaliDate.jm);

    useEffect(() => {
        Cookie.set("year", selectedYear);
        Cookie.set("month", selectedMonth);
        router.refresh();
    }, [selectedYear, selectedMonth]);

    return (
        <Card title={<CalendarNavigation year={selectedYear} setYear={setSelectedYear} month={selectedMonth} setMonth={setSelectedMonth} />}>
            <Calendar year={selectedYear} month={selectedMonth} />
        </Card>
    );
};

export default CalendarContainer;
