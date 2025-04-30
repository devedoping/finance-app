import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "@/lib/prisma";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials.email && !credentials.password) {
                    throw new Error("Email and password is required");
                }

                const user = await prisma.user.findUnique({
                    where: { username: credentials.email },
                });

                if (!user) {
                    throw new Error("User does not exist");
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Invalid email or password");
                }

                return { id: user.id, email: user.email };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({token, user}) {
            if(user) token.user = user;
            return token;
        },
        async session({session, token}) {
            session.user = token.user;
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/",
    },
});
