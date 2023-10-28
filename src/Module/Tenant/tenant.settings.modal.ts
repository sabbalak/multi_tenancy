import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Tenant } from "./tenant.modal";

export class Locale {
    language: string;
}

@Entity('tenant-settings')
export class TenantSettings {

    @PrimaryColumn('uuid')
    @OneToOne(() => Tenant, (tenant) => tenant.tenantSettings, { eager: false })
    tenant: string;

    @Column()
    currency: string;
 
    @Column({
        type: 'json',
        nullable: false, 
    })
    locale: Locale;
 
    @Column({ name: 'agreement_doc'})
    agreementDoc: string;

    @CreateDateColumn({ name: 'created_at' }) // Recommended
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' }) // Recommended 
    updatedAt: Date;

}