"use client";
import React from 'react';
import {faSun} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Input = ({ label, prefix, placeholder, suffix, ...rest }) => {
    return (
        <div className="mb-6">
            <label htmlFor="" className="block mb-2">{label}</label>
            <div className="border border-gray-200 flex flex-row-reverse gap-4 justify-between items-center py-2 px-3">
                {prefix && <FontAwesomeIcon icon={prefix} /> }
                <input
                    className="w-full"
                    placeholder={placeholder}
                    {...rest}
                />
                {suffix && <FontAwesomeIcon icon={suffix} /> }
            </div>
        </div>
    );
};

export default Input;
