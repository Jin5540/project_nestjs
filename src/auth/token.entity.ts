import { OneToOne, BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Token extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accessToken: string;

    @Column()
    refreshToken: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToOne(type => User, user=> user.token)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: number;

}