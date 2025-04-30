import React from 'react';

const Day = ({day, hasDueDate = false }) => {
    return (
        <div
            className={`border border-black rounded p-2 text-right relative 
            ${day.currentMonth ? `opacity-100` : `opacity-40 border-transparent`}
            ${hasDueDate ? `bg-green-200/50` : ``}
            `}>
            {day.jd}
            {hasDueDate && (
                <i className="w-2 h-2 absolute right-0 left-0 bottom-1 m-auto rounded-full bg-green-500"></i>
            )}
        </div>
    );
};

export default Day;
