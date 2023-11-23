import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  ValidateNested,
} from '@nestjs/class-validator';
import { TenantStatus } from './../../../common/enums';

export class Billing {
  email: string;
  mobile: string;
}

export class Contact {
  email: string;
  mobile: string;
}

export class Locale {
  @IsNotEmpty()
  language: string;
}

export class CreateTenantDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ValidateNested({ each: true, message: 'billing must be object' })
  billing: Billing;

  @IsNotEmpty()
  @ValidateNested({ each: true, message: 'contact must be object' })
  contact: Contact;

  @IsNotEmpty()
  userCount: number;

  @IsNotEmpty()
  @IsEnum(TenantStatus)
  status: string;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  @ValidateNested({ each: true, message: 'locale must be object' })
  locale: Locale;

  @IsNotEmpty()
  agreementDoc: string;
}

export class UpdateTenantDto {
  @IsOptional()
  @ValidateNested({ each: true, message: 'billing must be object' })
  billing: Billing;

  @IsOptional()
  @ValidateNested({ each: true, message: 'contact must be object' })
  contact: Contact;

  @IsOptional()
  userCount: number;

  @IsOptional()
  @IsEnum(TenantStatus)
  status: string;

  @IsOptional()
  currency: string;

  @IsOptional()
  @ValidateNested({ each: true, message: 'locale must be object' })
  locale: Locale;

  @IsOptional()
  agreementDoc: string;
}
