"use client";
import React, {useEffect} from 'react';
import {useIncomeStore} from "@/store/incomeStore";

const SecureSwitch = () => {
    const { secure, setSecure } = useIncomeStore();

    useEffect(() => {
        setSecure(localStorage.getItem("secure") === "true")
    }, []);

    return (
        <div className="px-6">
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer"
                       checked={secure}
                       onChange={() => setSecure(!secure)}
                />
                <div
                    className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
        </div>
    );
};

export default SecureSwitch;