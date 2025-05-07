import React from 'react';
import SecureSwitch from "@/components/Card/SecureSwitch";

const Card = ({title, secure = false, children}) => {
    return (
        <div className="bg-white rounded shadow pt-4 mb-8">
            <div className="flex justify-between items-center border-b border-gray-300">
                <div className="card-title text-lg font-medium px-6 pb-4 ">{title}</div>
                {secure ? <SecureSwitch /> : null}
            </div>
            <div className="card-body pt-6 px-6">{children}</div>
        </div>
    );
};
export default Card;
