"use client";
import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import {useTheme} from "next-themes";

const SwitchTheme = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button className="mr-auto" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <FontAwesomeIcon icon={theme === "dark" ? faMoon : faSun} />
        </button>
    );
};

export default SwitchTheme;
