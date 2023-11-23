import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ListingsStatus, FURNISHING_TYPES } from 'src/common/enums';

@Entity('featured_listings')
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenantId: string;

  @Column()
  name: string;

  @Column({ name: 'property_location' })
  propertyLocation: string;

  @Column({ name: 'about_property', nullable: true })
  aboutProperty: string;

  @Column({ nullable: true })
  price: number;

  @Column({ name: 'property_type' })
  propertyType: string;

  @Column({ name: 'floor_size' })
  floorSize: string;

  @Column({ name: 'furnishing' })
  furnishing: FURNISHING_TYPES;

  @Column({ name: 'added_by' })
  addedBy: string;

  @Column({ name: 'is_added_by_feature_agent' })
  addedByFeatureAgent: boolean;

  @Column({ name: 'status' })
  status: ListingsStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
