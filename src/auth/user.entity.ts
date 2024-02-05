import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { UserRoles } from "./user-role.enum";
import { Token } from "./token.entity";

@Entity()
@Unique(['email'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column()
    role: UserRoles;

    @OneToOne(type => Token, token=> token.user)
    token: Token;
}