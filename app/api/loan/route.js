import {auth} from "@/lib/auth";
import {NextResponse} from "next/server";
import jalaali from "jalaali-js";
import { prisma } from "@/lib/prisma";

export const POST = auth(async function POST(req) {
    if(!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const { name, amount, totalTerm, dueDay, startDate } = await req.json();

    try {
        const startJalali = jalaali.toJalaali(new Date(startDate));

        const installments = Array.from({ length: totalTerm }).map((_, index) => {
            const targetMonth = startJalali.jm + index;
            const jy = startJalali.jy + Math.floor((targetMonth - 1) / 12);
            const jm = ((targetMonth - 1) % 12) + 1;
            const jd = parseInt(dueDay);
            const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
            return {
                dueDate: new Date(gy, gm - 1, gd),
                paid: false,
            }
        });

        const loan = await prisma.loan.create({
            data: {
                name,
                amount,
                totalTerm: parseInt(totalTerm),
                startDate: new Date(startDate),
                installments: {
                    createMany: {
                        data: installments,
                    }
                }
            },
            include: {
                installments: true,
            }
        });

        return NextResponse.json( loan, { status: 201 });
    } catch (e) {
        return NextResponse.json({ message: e.message }, { status: 500 });
    }

});
