"use client";
import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faEye, faLock, faPlus} from "@fortawesome/free-solid-svg-icons";
import Popup from "@/components/Popup/Popup";
import Input from "@/components/Input/Input";
import Checkbox from "@/components/Checkbox/Checkbox";
import Button from "@/components/Button/Button";
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import {useRouter} from "next/navigation";

const NewIncome = () => {
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [startDate, setStartDate] = useState(new Date().getTime());
    const [endDate, setEndDate] = useState(null);
    const [hasEndDate, setHasEndDate] = useState(false);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);

    const handleChangeStartDate = (value) => {
        setStartDate(value);
    }
    const handleChangeEndDate = (value) => {
        setEndDate(value);
    }

    const handleSubmit = async () => {
        const newIncomeResponse = await fetch("/api/income", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                amount: amount,
                startDate: startDate,
                endDate: endDate,
            }),
        });

        if(newIncomeResponse?.ok) {
            setStartDate(new Date().getTime());
            setEndDate(null);
            setHasEndDate(false);
            setTitle("");
            setAmount(0);
            setShowPopup(false);
            router.refresh();
        }
    }

    return (
        <>
            <button className="bg-slate-100 rounded text-sm w-full py-2 mb-6" onClick={() => setShowPopup(true)}>
                <FontAwesomeIcon icon={faPlus} className="ml-2"/>
                افزودن درآمد
            </button>
            <Popup show={showPopup} setShow={setShowPopup}>
                <h1 className="text-2xl text-center mb-6">اضافه کردن درآمد جدید</h1>
                <Input label="عنوان درآمد" placeholder="عنوان درآمد خود را وارد کنید"
                       type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Input label="میزان درآمد" placeholder="به تومان" dir="ltr"
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
                    <div className="mt-2">
                        <input type="checkbox" id="has-end-date" onChange={() => setHasEndDate(!hasEndDate)} />
                        <label htmlFor="has-end-date" className="mr-2">تاریخ پایان دارد؟</label>
                    </div>
                </div>
                {hasEndDate && (
                    <div className="mb-6">
                        <label htmlFor="" className="block mb-2">تاریخ پایان</label>
                        <DatePicker
                            calendar={persian}
                            locale={persian_fa}
                            calendarPosition="bottom-right"
                            value={endDate}
                            onChange={handleChangeEndDate}
                        />
                    </div>
                )}
                <Button label={isPending ? "در حال ذخیره..." : "ذخیره"} onClick={handleSubmit} />
                {/*{error && (*/}
                {/*    <div className="text-red-500 text-center mt-2">{error}</div>*/}
                {/*)}*/}
            </Popup>
        </>
    );
};

export default NewIncome;
