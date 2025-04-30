"use client";
import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import Row from "@/components/Card/Row";
import {useRouter} from "next/navigation";
import Popup from "@/components/Popup/Popup";

const IncomeRow = ({ income }) => {
    const router = useRouter();
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const handleDelete = async (id) => {
        const deleteResponse = await fetch(`/api/income/${income?.id}`, {
            method: "DELETE",
        });

        if(deleteResponse?.ok) {
            router.refresh();
        }
    }

    return (
        <Row>
            <div className="text-black">{income?.title}</div>
            <div className="font-medium mr-auto ml-1">{parseInt(income?.amount).toLocaleString()} تومان</div>
            <button className="text-red-400" onClick={() => setShowDeletePopup(true)}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>
            <Popup show={showDeletePopup} setShow={setShowDeletePopup}>
                <p>آیا از حذف این درآمد مطمئن هستید؟</p>
                <div className="flex gap-4 justify-end mt-4">
                    <button className="rounded px-3 py-2 bg-gray-400" onClick={() => setShowDeletePopup(false)}>انصراف</button>
                    <button className="rounded px-3 py-2 bg-red-500 text-white" onClick={handleDelete}>بله، حذف شود!</button>
                </div>
            </Popup>
        </Row>
    );
};

export default IncomeRow;
