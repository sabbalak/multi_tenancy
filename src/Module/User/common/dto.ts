import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  ValidateNested,
  IsUUID,
} from '@nestjs/class-validator';
import { UserRole, UserStatus } from './enum';

export class Profile {
  address: string;
  email: string;
  mobile: string;
}

export class TenantIdDto {
  @IsNotEmpty()
  @IsUUID()
  tenantId: string;

  @IsOptional()
  @IsUUID()
  id: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ValidateNested({ each: true, message: 'profile must be object' })
  profile: Profile;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  // @IsNotEmpty()
  // @IsEnum(UserStatus)
  // status: string;
}

export class UpdateUserDto {
  @IsOptional()
  @ValidateNested({ each: true, message: 'profile must be object' })
  profile: Profile;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  password: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status: string;
}

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  password: string;
}
