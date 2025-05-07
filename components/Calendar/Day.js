import React from 'react';

const Day = ({day, hasDueDate = false, today = false }) => {
    return (
        <div
            className={`border border-black rounded p-2 text-right relative 
            ${day.currentMonth ? `opacity-100` : `opacity-40 border-transparent`}
            ${hasDueDate ? `bg-green-200/50` : ``}
            ${today ? `border-2 border-indigo-600 text-indigo-600` : ``}
            `}>
            {day.jd}
            {hasDueDate && (
                <i className="w-2 h-2 absolute right-0 left-0 bottom-1 m-auto rounded-full bg-green-500"></i>
            )}
            {today && (
                <span className="absolute -top-3 right-0 left-0 mx-auto w-12 text-center text-sm bg-white border-2 border-indigo-600 px-2 rounded-md">امروز</span>
            )}
        </div>
    );
};

export default Day;
