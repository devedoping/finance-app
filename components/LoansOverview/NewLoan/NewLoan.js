"use client";
import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/navigation";
import Input from "@/components/Input/Input";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Button from "@/components/Button/Button";
import Popup from "@/components/Popup/Popup";

const NewLoan = () => {
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [startDate, setStartDate] = useState(new Date().getTime());
    const [totalTerm, setTotalTerm] = useState(0);
    const [dueDay, setDueDay] = useState(0);

    const handleChangeStartDate = (value) => {
        setStartDate(value);
    }

    const handleSubmit = async () => {
        const newIncomeResponse = await fetch("/api/loan", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                amount: amount,
                totalTerm: totalTerm,
                dueDay: dueDay,
                startDate: startDate,
            }),
        });

        if(newIncomeResponse?.ok) {
            setName("");
            setAmount(0);
            setTotalTerm(0);
            setDueDay(0);
            setStartDate(new Date().getTime());
            setShowPopup(false);
            router.refresh();
        }
    }

    return (
        <>
            <button className="bg-slate-100 rounded text-sm w-full py-2 mb-6" onClick={() => setShowPopup(true)}>
                <FontAwesomeIcon icon={faPlus} className="ml-2"/>
                افزودن وام
            </button>

            <Popup show={showPopup} setShow={setShowPopup}>
                <h1 className="text-2xl text-center mb-6">اضافه کردن وام جدید</h1>
                <Input label="عنوان وام" placeholder="عنوان وام خود را وارد کنید"
                       type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input label="مبلغ اقساط" placeholder="به تومان" dir="ltr"
                       type="number" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <div className="mb-6">
                    <label htmlFor="" className="block mb-2">تاریخ شروع</label>
                    <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                        value={startDate}
                        onChange={handleChangeStartDate}
                    />
                </div>
                <Input label="تعداد اقساط" dir="ltr"
                       type="number" name="totalTerm" value={totalTerm} onChange={(e) => setTotalTerm(e.target.value)} />
                <Input label="سررسید قسط" dir="ltr"
                       type="number" name="dueDate" value={dueDay} onChange={(e) => setDueDay(e.target.value)} />
                <Button label={isPending ? "در حال ذخیره..." : "ذخیره"} onClick={handleSubmit} />
                {/*{error && (*/}
                {/*    <div className="text-red-500 text-center mt-2">{error}</div>*/}
                {/*)}*/}
            </Popup>
        </>
    );
};

export default NewLoan;
