import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, Unique, JoinTable, ManyToOne } from "typeorm";
import { UserRole, UserStatus } from "./common/enum";
import { Tenant } from "../Tenant/tenant.modal";
import { UserPassword } from "./user.password.modal";

export class Profile {
    address: string;
    email: string;
    mobile: string;
}

@Entity('users')
@Unique(["name"])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    role: UserRole;

    @Column({
        type: 'json',
        nullable: false,
    })
    profile: Profile;

    // @ManyToOne(() => Tenant, (tenant) => tenant.user)
    @Column({ name: 'tenant' })
    tenant: string; 

    @OneToOne(() => UserPassword, (userPassword) => userPassword.user, { eager: true })
    userPassword: UserPassword;
    
    @Column()
    status: UserStatus;

    @CreateDateColumn({ name: 'created_at' }) // Recommended
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' }) // Recommended 
    updatedAt: Date;
    
    tenants: Tenant;
 
}  