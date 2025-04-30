"use client";
import React from 'react';

const Checkbox = ({ label }) => {
    return (
        <div>
            <input type="checkbox" className="relative top-1 ml-2" />
            <label htmlFor="">{label}</label>
        </div>
    );
};

export default Checkbox;
