import { BaseEntity } from "typeorm";
import { Role } from "./role.entity";
export declare class User extends BaseEntity {
    id: number;
    email: string;
    password: string;
    createAt: Date;
    updateAt: Date;
    role: Role;
}
