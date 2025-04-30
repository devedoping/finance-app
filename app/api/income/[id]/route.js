import {auth} from "@/lib/auth";
import {NextResponse} from "next/server";
import { prisma } from "@/lib/prisma";

export const DELETE = auth(async function DELETE(req, { params }) {
    if(!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { id } = params;

    try {
        await prisma.income.delete({
            where: {id: id},
        });
        return NextResponse.json({ message: "Income deleted successfully" }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: e.message }, { status: 500 });
    }
});