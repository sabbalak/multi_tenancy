import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UserService } from './user.service';
import {
  CreateUserDto,
  TenantIdDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from './common/dto';
import { User } from './user.modal';

@Controller('/tenants/:tenantId/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(@Param() query: TenantIdDto): Promise<User[]> {
    return this.userService.getUsers(query);
  }

  @Get('/:id')
  getTenantById(@Param() query: TenantIdDto): Promise<User> {
    return this.userService.getUserById(query);
  }

  @Post()
  createUser(
    @Param() query: TenantIdDto,
    @Body() body: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(query, body);
  }

  @Put('/:id')
  updateUser(
    @Param() query: TenantIdDto,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(query, body);
  }

  @Put('/:id/password')
  updateUserPassword(
    @Param() query: TenantIdDto,
    @Body() body: UpdateUserPasswordDto,
  ): Promise<void> {
    return this.userService.updateUserPassword(query, body);
  }

  @Delete('/:id')
  deleteUserById(@Param() query: TenantIdDto): Promise<void> {
    return this.userService.deleteUserById(query);
  }

  // @Patch('/:id/category')
  // updateProductStatus(
  //   @Param('id') id: string,
  //   @Body('category') category: ProductCategory,
  // ): Product {
  //   return this.productService.updateProductStatus(id, category);
  // }
}
