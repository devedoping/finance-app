"use client";
import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {MONTH_NAMES} from "@/lib/consts";

const CalendarNavigation = ({year, setYear, month, setMonth}) => {

    const handleNextMonth = () => {
        if(month === 12) {
            setMonth(1);
            setYear(prev => prev + 1);
        } else {
            setMonth(prev => prev + 1);
        }
    }

    const handlePrevMonth = () => {
        if(month === 1) {
            setMonth(12);
            setYear(prev => prev - 1);
        } else {
            setMonth(prev => prev - 1);
        }
    }

    return (
        <div className="flex">
            <button className="text-sm ml-2" onClick={handlePrevMonth}>
                <FontAwesomeIcon icon={faChevronRight} className="ml-2"/>
            </button>
            <select className="bg-slate-200 border border-slate-300 px-2 text-sm font-normal"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
            >
                {MONTH_NAMES.map((name, index) => (
                    <option key={`month-${index}`} value={index + 1}>{name}</option>
                ))}
            </select>
            <button className="text-sm mr-2" onClick={handleNextMonth}>
                <FontAwesomeIcon icon={faChevronLeft} className="ml-2"/>
            </button>
        </div>
    );
};

export default CalendarNavigation;
