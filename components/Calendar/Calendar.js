"use client";
import React from 'react';
import jalaali from "jalaali-js";
import Day from "@/components/Calendar/Day";
import {useLoanStore} from "@/store/loanStore";

const getMonthDays = (year, month) => {
    const firstDayJ = {jy: year, jm: month, jd: 1};
    const firstDayG = jalaali.toGregorian(firstDayJ.jy, firstDayJ.jm, firstDayJ.jd);
    const firstDayDate = new Date(firstDayG.gy, firstDayG.gm - 1, firstDayG.gd);
    const startWeekDay = firstDayDate.getDay(); // sun: 0 >>> sat: 6

    const shift = (startWeekDay + 1) % 7;

    const days = [];

    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const daysInPrevMonth = jalaali.jalaaliMonthLength(prevYear, prevMonth);
    for (let i = shift - 1; i >= 0; i--) {
        days.push({
            jy: prevYear,
            jm: prevMonth,
            jd: daysInPrevMonth - i,
            currentMonth: false,
        });
    }

    const daysInCurrentMonth = jalaali.jalaaliMonthLength(year, month);
    for (let i = 1; i <= daysInCurrentMonth; i++) {
        days.push({
            jy: year,
            jm: month,
            jd: i,
            currentMonth: true,
        });
    }

    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    const total = days.length;
    const remaining = 42 - total; // 6*7 month view
    for (let i = 1; i <= remaining; i++) {
        days.push({
            jy: nextYear,
            jm: nextMonth,
            jd: i,
            currentMonth: false,
        });
    }

    return days;
}

const Calendar = ({year, month}) => {
    const days = getMonthDays(year, month);

    const {installments} = useLoanStore();

    const checkHasDueDate = (day) => {
        return installments.some(installment => {
            const dueDate = new Date(installment.dueDate);
            const dueDateJalali = jalaali.toJalaali(dueDate);

            return (
                dueDateJalali.jy === day.jy &&
                dueDateJalali.jm === day.jm &&
                dueDateJalali.jd === day.jd
            );
        });
    };

    return (
        <div className="grid grid-cols-7 gap-4 pb-6">
            {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day, index) => (
                <div key={`weekday-${index}`}>{day}</div>
            ))}
            {days.map((day, index) => (
                <Day key={`day-${index}`} day={day} hasDueDate={checkHasDueDate(day)}
                     today={jalaali.toJalaali(new Date()).jy === day.jy && jalaali.toJalaali(new Date()).jm === day.jm && jalaali.toJalaali(new Date()).jd === day.jd}
                />
            ))}
        </div>
    );
};

export default Calendar;
