import { BaseEntity } from "typeorm";
import { UserRoles } from "./user-role.enum";
import { User } from "./user.entity";
export declare class Role extends BaseEntity {
    id: number;
    roles: UserRoles;
    users: User[];
}
