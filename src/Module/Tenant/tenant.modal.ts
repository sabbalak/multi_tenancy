import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  Unique,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TenantStatus } from './common/enum';
import { TenantSettings } from './tenant.settings.modal';
import { User } from '../User/user.modal';

export class Billing {
  email: string;
  mobile: string;
}

export class Contact {
  email: string;
  mobile: string;
}

@Entity('tenants')
@Unique(['name'])
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'json',
    nullable: false,
  })
  billing: Billing;

  @Column({
    type: 'json',
    nullable: false,
  })
  contact: Contact;

  @Column({ name: 'user_count' })
  userCount: number;

  @Column()
  status: TenantStatus;

  @OneToOne(() => TenantSettings, (tenantSettings) => tenantSettings.tenant, {
    eager: true,
  })
  tenantSettings: TenantSettings;

  @OneToMany(() => User, (user) => user.tenant, { eager: true })
  @JoinColumn()
  user: User;

  @CreateDateColumn({ name: 'created_at' }) // Recommended
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' }) // Recommended
  updatedAt: Date;
}
