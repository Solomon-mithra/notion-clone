import { User } from "@clerk/nextjs/server";

declare global {
    interface CustomJwtSessionClaims extends User {}
} 