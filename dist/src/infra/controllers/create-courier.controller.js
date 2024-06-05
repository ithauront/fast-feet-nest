"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourierController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcryptjs_1 = require("bcryptjs");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const createAccountBodySchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    cpf: zod_1.z.string(),
    password: zod_1.z.string(),
    phone: zod_1.z.string(),
    latitude: zod_1.z.number(),
    longitude: zod_1.z.number()
});
let CreateCourierController = class CreateCourierController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handle(body) {
        const { name, email, cpf, password, phone, latitude, longitude } = body;
        const courierWithSameEmail = await this.prisma.courier.findUnique({
            where: { email }
        });
        if (courierWithSameEmail) {
            throw new common_1.ConflictException('A courier with this email already exists.');
        }
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 8);
        await this.prisma.courier.create({
            data: {
                name,
                email,
                cpf,
                password: hashedPassword,
                phone,
                latitude: latitude ?? null,
                longitude: longitude ?? null
            }
        });
    }
};
exports.CreateCourierController = CreateCourierController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(createAccountBodySchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateCourierController.prototype, "handle", null);
exports.CreateCourierController = CreateCourierController = __decorate([
    (0, common_1.Controller)('/users/courier'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CreateCourierController);
//# sourceMappingURL=create-courier.controller.js.map