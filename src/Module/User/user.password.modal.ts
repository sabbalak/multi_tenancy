import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, Unique, JoinTable, ManyToOne, PrimaryColumn } from "typeorm";
import { UserRole, UserStatus } from "./common/enum";
import { User } from "./user.modal";

export class Profile {
    address: string;
    email: string;
    mobile: string;
}

@Entity('users-password')
@Unique(["username"])
export class UserPassword {
    @PrimaryColumn('uuid')
    @OneToOne(() => User, { eager: false })
    user: string;

    @Column()
    username: string;
    
    @Column()
    password: string;

    @CreateDateColumn({ name: 'created_at' }) // Recommended
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' }) // Recommended 
    updatedAt: Date;
 
}  