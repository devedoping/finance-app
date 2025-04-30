import {auth} from "@/lib/auth";
import {NextResponse} from "next/server";
import { prisma } from "@/lib/prisma";

export const PATCH = auth(async function PATCH(req, { params }) {
    if(!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const { id } = params;

    try {
        const updated = await prisma.installment.update({
            where: { id },
            data: {
                paid: true,
            }
        });

        return NextResponse.json(updated, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: e.message }, { status: 500 });
    }
});