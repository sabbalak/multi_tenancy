import {
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsUUID,
} from '@nestjs/class-validator';

export class TenantIdDto {
  @IsNotEmpty()
  @IsUUID()
  tenantId: string;

  @IsOptional()
  @IsUUID()
  id: string;
}

export class ContactDetails {
  email: string;
  mobile: string;
}

export class SocialMediaLinks {
  instagram: string;
  facebook: string;
  youtube: string;
}

export class CreateAgentDto {
  @IsNotEmpty()
  agentName: string;

  @IsNotEmpty()
  @ValidateNested({ each: true, message: 'contact details must be object' })
  contactDetails: ContactDetails;

  @IsOptional()
  websiteLink: string;

  @IsOptional()
  socialMediaLink: SocialMediaLinks;

  @IsOptional()
  rating: number;
}

export class UpdateAgentDto {
  @IsOptional()
  agentName: string;

  @IsOptional()
  @ValidateNested({ each: true, message: 'contact details must be object' })
  contactDetails: ContactDetails;

  @IsOptional()
  websiteLink: string;

  @IsOptional()
  socialMediaLink: SocialMediaLinks;

  @IsOptional()
  rating: number;
}
