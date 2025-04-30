"use client";
import React, {useState} from 'react';
import PayButton from "@/components/LoansOverview/PayButton/PayButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import Row from "@/components/Card/Row";
import jalaali from "jalaali-js";
import {getMonthName} from "@/lib/date";
import Popup from "@/components/Popup/Popup";
import {useRouter} from "next/navigation";

const LoanRow = ({ installment }) => {
    const router = useRouter();
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const handleDelete = async () => {
        const deleteResponse = await fetch(`/api/loan/${installment?.loan?.id}`, {
            method: "DELETE",
        });

        if(deleteResponse?.ok) {
            router.refresh();
        }
    }

    const miladiDate = new Date(installment?.dueDate);
    const jDate = jalaali.toJalaali(miladiDate);

    return (
        <Row>
            <div className="text-sm">
                <div>{installment?.loan?.name}</div>
                <div className="text-slate-500">{`${jDate.jd} ${getMonthName(jDate.jm)}`}</div>
            </div>
            <div className="text-sm">
                <div className={`font-medium ${installment?.paid ? `line-through` : ``}`}>{parseInt(installment?.loan?.amount).toLocaleString()} تومان</div>
                <div className="text-left">
                    <PayButton isPaid={installment?.paid} installmentId={installment?.id} />
                    <button className="text-red-400" onClick={() => setShowDeletePopup(true)}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </div>
            </div>
            <Popup show={showDeletePopup} setShow={setShowDeletePopup}>
                <p>آیا از حذف این وام مطمئن هستید؟</p>
                <div className="flex gap-4 justify-end mt-4">
                    <button className="rounded px-3 py-2 bg-gray-400" onClick={() => setShowDeletePopup(false)}>انصراف</button>
                    <button className="rounded px-3 py-2 bg-red-500 text-white" onClick={handleDelete}>بله، حذف شود!</button>
                </div>
            </Popup>
        </Row>
    );
};

export default LoanRow;
