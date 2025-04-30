"use client";
import Image from "next/image";
import Input from "@/components/Input/Input";
import {faEnvelope, faLock, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "@/components/Checkbox/Checkbox";
import Button from "@/components/Button/Button";
import {useEffect, useState, useTransition} from "react";
import {useRouter} from "next/navigation";
import {signIn, useSession} from "next-auth/react";

export default function Home() {
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { data, status } = useSession();
    console.log(data, status);

    useEffect(() => {
        if(status === "authenticated") {
            router.push("/dashboard");
        }
    }, [status, router]);

    const handleSignIn = async (formData) => {
        setError("");
        const email = formData.get("email");
        const password = formData.get("password");

        startTransition(async () => {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if(res?.error) {
                setError("Invalid email or password.");
            } else {
                router.push("/dashboard");
            }
        });
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-[80vh]">
                <form className="bg-white dark:bg-slate-700 rounded-lg p-8 shadow-lg w-md"
                    action={handleSignIn}
                >
                    <h1 className="text-2xl text-center mb-6">خوش آمدید</h1>
                    <Input label="ایمیل" placeholder="ایمیل خود را وارد کنید" prefix={faEnvelope} dir="ltr"
                           type="email" name="email"/>
                    <Input label="کلمه عبور" placeholder="کلمه عبور خود را وارد کنید" prefix={faLock} suffix={faEye}
                           dir="ltr" type="password" name="password"/>
                    <div className="flex justify-between mb-6">
                        <Checkbox label="مرا به خاطر بسپار"/>
                    </div>
                    <Button label={isPending ? "در حال ورود..." : "ورود"}/>
                    {error && (
                        <div className="text-red-500 text-center mt-2">{error}</div>
                    )}
                </form>
            </div>
            <div className="text-center pb-4">طراحی و توسعه توسط <a href="https://devedoping.ir">دوپینگ برنامه‌نویسی</a></div>
        </>
    );
}
