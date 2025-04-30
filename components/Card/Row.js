import React from 'react';

const Row = ({ children }) => {
    return (
        <div className="flex justify-between items-center pb-6">{children}</div>
    );
};

export default Row;
