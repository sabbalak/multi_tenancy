import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  Unique,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.modal';
import * as bcrypt from 'bcryptjs';

export class Profile {
  address: string;
  email: string;
  mobile: string;
}

@Entity('users-password')
@Unique(['username'])
export class UserPassword {
  @PrimaryColumn('uuid')
  @OneToOne(() => User, { eager: false })
  user: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @CreateDateColumn({ name: 'created_at' }) // Recommended
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' }) // Recommended
  updatedAt: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
