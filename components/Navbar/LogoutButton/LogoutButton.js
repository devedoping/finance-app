"use client";
import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {signOut} from "next-auth/react";

const LogoutButton = () => {
    return (
        <button className="bg-gray-300 text-black px-4 py-2 rounded-lg" onClick={ () => signOut() }>
            <FontAwesomeIcon icon={faRightFromBracket} className="ml-2" />
            خروج
        </button>
    );
};

export default LogoutButton;
