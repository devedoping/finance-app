import React from 'react';
import Link from "next/link";
import SwitchTheme from "@/components/Navbar/SwitchTheme/SwitchTheme";
import LogoutButton from "@/components/Navbar/LogoutButton/LogoutButton";

const Navbar = () => {
    return (
        <div className="bg-white border-b border-gray-300">
            <div className="flex gap-4 justify-between items-center max-w-7xl mx-auto py-3">
                <Link href="/">
                    <img src="/logo.svg" alt="site logo"/>
                </Link>
                <SwitchTheme/>
                <LogoutButton/>
            </div>
        </div>
    );
};

export default Navbar;
