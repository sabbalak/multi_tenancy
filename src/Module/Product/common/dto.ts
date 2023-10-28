
import { IsNotEmpty, IsEnum, IsOptional } from '@nestjs/class-validator';
import { ProductCategory } from './enum';

export class CreateProductDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsEnum(ProductCategory)
    category: ProductCategory;
}

export class GetProductFilterDto {
    @IsOptional()
    search: string;

    @IsOptional()
    @IsEnum(ProductCategory)
    category: ProductCategory;
}  