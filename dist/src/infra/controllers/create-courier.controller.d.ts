import { PrismaService } from "../prisma/prisma.service";
import { z } from "zod";
declare const createAccountBodySchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    cpf: z.ZodString;
    password: z.ZodString;
    phone: z.ZodString;
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    cpf: string;
    password: string;
    phone: string;
    latitude: number;
    longitude: number;
}, {
    name: string;
    email: string;
    cpf: string;
    password: string;
    phone: string;
    latitude: number;
    longitude: number;
}>;
type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;
export declare class CreateCourierController {
    private prisma;
    constructor(prisma: PrismaService);
    handle(body: CreateAccountBodySchema): Promise<void>;
}
export {};
