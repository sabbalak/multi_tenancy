import { IsNotEmpty, IsOptional, IsUUID } from '@nestjs/class-validator';
import { FURNISHING_TYPES } from 'src/common/enums';

export class TenantIdDto {
  @IsNotEmpty()
  @IsUUID()
  tenantId: string;

  @IsOptional()
  @IsUUID()
  id: string;
}

export class CreateListingDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  propertyLocation: string;

  @IsNotEmpty()
  aboutProperty: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  propertyType: string;

  @IsNotEmpty()
  floorSize: string;

  @IsNotEmpty()
  furnishing: FURNISHING_TYPES;

  @IsNotEmpty()
  addedByFeatureAgent: boolean;

  @IsNotEmpty()
  addedBy: string;
}

export class UpdateListingDto {
  @IsOptional()
  name: string;

  @IsOptional()
  propertyLocation: string;

  @IsOptional()
  aboutProperty: string;

  @IsOptional()
  price: number;

  @IsOptional()
  propertyType: string;

  @IsOptional()
  floorSize: string;

  @IsOptional()
  furnishing: FURNISHING_TYPES;

  @IsOptional()
  addedByFeatureAgent: boolean;

  @IsOptional()
  addedBy: string;
}
