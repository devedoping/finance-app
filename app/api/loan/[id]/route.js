import {auth} from "@/lib/auth";
import {NextResponse} from "next/server";
import { prisma } from "@/lib/prisma";

export const DELETE = auth(async function DELETE(req, { params }) {
    if(!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { id } = params;

    try {
        await prisma.installment.deleteMany({
            where: {
                loanId: id,
            }
        });
        await prisma.loan.delete({
            where: {id: id},
        });
        return NextResponse.json({ message: "Loan deleted successfully" }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: e.message }, { status: 500 });
    }
});