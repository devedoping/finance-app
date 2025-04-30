import {auth} from "@/lib/auth";
import {NextResponse} from "next/server";
import {getCurrentJalaliMonthRange, getJalaliMonthRange} from "@/lib/date";
import {cookies} from "next/headers";
import { prisma } from "@/lib/prisma";

export const GET = auth(async function GET(req) {
    if(!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const cookieStore = await cookies();
    const year = cookieStore.get("year")?.value;
    const month = cookieStore.get("month")?.value;

    let startDate, endDate;
    if(year && month && month !== "undefined" && year !== "undefined") {
        ({ startDate, endDate } = getJalaliMonthRange(parseInt(year), parseInt(month)));
    } else {
        ({ startDate, endDate } = getCurrentJalaliMonthRange());
    }


    try {
        const installments = await prisma.installment.findMany({
            where: {
                dueDate: {
                    gte: startDate,
                    lte: endDate,
                }
            },
            include: {
                loan: true,
            },
            orderBy: {
                dueDate: "asc"
            }
        });

        return NextResponse.json(installments, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: e.message }, { status: 500 });
    }
});