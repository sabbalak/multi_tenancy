import { Injectable } from '@nestjs/common';

import { v4 as uuid } from 'uuid';
import { CreateProductDto, GetProductFilterDto } from './common/dto';
import { Product } from './common/interface';
import { ProductCategory } from './common/enum';

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: '26e8dd9c-df7a-48f4-b85e-55f1e3435e9c',
      title: 'I-Phone',
      description: 'Take Test 1',
      category: ProductCategory.MOBILE,
    },
  ];

  getAllProduct(): Product[] {
    return this.products;
  }

  getProductWithFilters(filterDto: GetProductFilterDto): Product[] {
    const { category, search } = filterDto;

    let products = this.getAllProduct();

    if (category) {
      products = products.filter((product) => product.category === category);
    }

    if (search) {
      products = products.filter((product) => {
        if (
          product.title.includes(search) ||
          product.description.includes(search)
        ) {
          return true;
        }

        return false;
      });
    }

    return products;
  }

  getProductById(id: string): Product {
    return this.products.find((product) => product.id === id);
  }

  createProduct(createTaskDto: CreateProductDto): Product {
    const { title, description, category } = createTaskDto;

    const product: Product = {
      id: uuid(),
      title,
      description,
      category,
    };

    this.products.push(product);
    return product;
  }

  deleteProduct(id: string): void {
    this.products = this.products.filter((product) => product.id !== id);
  }

  updateProduct(id: string, createProductDto: CreateProductDto): Product {
    const product = this.getProductById(id);
    product.title = createProductDto.title;
    product.description = createProductDto.description;
    product.category = createProductDto.category;
    return product;
  }

  updateProductStatus(id: string, category: ProductCategory): Product {
    const product = this.getProductById(id);
    product.category = category;
    return product;
  }
}
