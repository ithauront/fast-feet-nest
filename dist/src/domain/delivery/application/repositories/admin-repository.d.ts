import { QueryParams } from '@/core/repositories/query-params';
import { Admin } from '@/domain/delivery/enterprise/entities/admin';
export interface AdminRepository {
    create(admin: Admin): Promise<void>;
    findById(packageId: string): Promise<Admin | null>;
    findByEmail(email: string): Promise<Admin | null>;
    findByCpf(cpf: string): Promise<Admin | null>;
    save(admin: Admin): Promise<void>;
    findMany(params: QueryParams): Promise<Admin[]>;
}
