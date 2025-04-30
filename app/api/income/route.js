// CRUD: Create(POST), Read(GET), Update(PUT, PATCH), Delete(Delete)
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
    if(year && month) {
        ({ startDate, endDate } = getJalaliMonthRange(parseInt(year), parseInt(month)));
    } else {
        ({ startDate, endDate } = getCurrentJalaliMonthRange());
    }

    const incomes = await prisma.income.findMany({
        where: {
            startDate: {
                lte: endDate,
            },
            OR: [
                {
                    endDate: null,
                },
                {
                    endDate: {
                        gte: startDate,
                    }
                }
            ]
        }
    });

    return NextResponse.json( incomes, { status: 200 });
});

export const POST = auth(async function POST(req) {
    if(!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    try {
        const { title, amount, startDate, endDate } = await req.json();

        const newIncome = await prisma.income.create({
            data: {
                title,
                amount,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
            }
        });

        return NextResponse.json( newIncome, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});