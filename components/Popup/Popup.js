import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

const Popup = ({ show, setShow, children }) => {
    if(!show) return null;
    return (
        <>
            <div className="bg-black/80 fixed z-10 top-0 right-0 bottom-0 left-0" onClick={() => setShow(false)} />
            <div className="fixed z-20 right-0 left-0 mx-auto top-1/6 bg-white dark:bg-slate-700 rounded-lg p-8 pt-4 shadow-lg w-md">
                <div className="text-left">
                    <button className="text-black p-2" onClick={() => setShow(false)}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                </div>
                {children}
            </div>
        </>
    );
};

export default Popup;
