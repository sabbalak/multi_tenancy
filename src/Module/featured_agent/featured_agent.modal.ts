import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

export class ContactDetails {
  email: string;
  mobile: string;
}

export class SocialMediaLinks {
  instagram: string;
  facebook: string;
  youtube: string;
}

@Entity('feature_agent')
@Unique(['agentName'])
export class FeatureAgent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => Tenant, (tenant) => tenant.user)
  @Column()
  tenantId: string;

  @Column({ name: 'agent_name' })
  agentName: string;

  @Column({
    type: 'json',
    nullable: false,
    name: 'contact_details',
  })
  contactDetails: ContactDetails;

  @Column({ name: 'website_link' })
  websiteLink: string;

  @Column({
    type: 'json',
    nullable: true,
    name: 'social_media_link',
  })
  socialMediaLink: SocialMediaLinks;

  @Column({ nullable: true })
  rating: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
