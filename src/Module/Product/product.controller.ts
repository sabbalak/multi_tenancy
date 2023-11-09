import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from './product.service';
import { Product } from './common/interface.js';
import { User } from '../User/user.modal';
import { GetUser } from '../Auth/get.user.decorator';
// import { CreateProductDto, GetProductFilterDto } from './common/dto';
// import { ProductCategory } from './common/enum.js';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private productService: ProductService) {}

  // @Get()
  // getProduct(@Query() filterDto: GetProductFilterDto): Product[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.productService.getProductWithFilters(filterDto);
  //   } else {
  //     return this.productService.getAllProduct();
  //   }
  // }

  @Get('/:id')
  getProductById(@Param('id') id: string, @GetUser() user: User): Product {
    console.log('user', user);
    return this.productService.getProductById(id);
  }

  // @Post()
  // createProduct(@Body() createProductDto: CreateProductDto): Product {
  //   return this.productService.createProduct(createProductDto);
  // }

  // @Put('/:id')
  // updateProduct(@Param('id') id: string, @Body() createProductDto: CreateProductDto): Product {
  //   return this.productService.updateProduct(id, createProductDto);
  // }

  // @Delete('/:id')
  // deleteProduct(@Param('id') id: string): void {
  //   return this.productService.deleteProduct(id);
  // }

  // @Patch('/:id/category')
  // updateProductStatus(
  //   @Param('id') id: string,
  //   @Body('category') category: ProductCategory,
  // ): Product {
  //   return this.productService.updateProductStatus(id, category);
  // }
}
