import React from 'react';

const Button = ({ label, ...rest }) => {
    return (
        <button className="bg-emerald-500 text-white w-full rounded-lg py-2" {...rest}>
            {label}
        </button>
    );
};

export default Button;
