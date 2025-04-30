import React from 'react';

const Card = ({ title, children }) => {
    return (
        <div className="bg-white rounded shadow pt-4 mb-8">
            <div className="card-title text-lg font-medium px-6 pb-4 border-b border-gray-300">{title}</div>
            <div className="card-body pt-6 px-6">{children}</div>
        </div>
    );
};

export default Card;
