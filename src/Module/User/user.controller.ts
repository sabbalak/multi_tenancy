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
import { ResponseDto } from 'src/common/response-dto';
import { RESPONSE_CODE, SUCCESS_MESSAGE } from 'src/common/response-data';

@Controller('/tenants/:tenantId/users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  async getUsers(@Param() query: TenantIdDto): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: SUCCESS_MESSAGE.RETRIVE_MESSAGE,
    };
    try {
      returnResponse.data = await this.userService.getUsers(query);
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }
    return returnResponse;
  }

  @Get('/:id')
  async getTenantById(@Param() query: TenantIdDto): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: SUCCESS_MESSAGE.RETRIVE_MESSAGE,
    };
    try {
      returnResponse.data = await this.userService.getUserById(query);
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }
    return returnResponse;
  }

  @Post()
  async createUser(
    @Param() query: TenantIdDto,
    @Body() body: CreateUserDto,
  ): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: SUCCESS_MESSAGE.CREATE_MESSAGE,
    };
    try {
      returnResponse.data = await this.userService.createUser(query, body);
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }
    return returnResponse;
  }

  @Put('/:id')
  async updateUser(
    @Param() query: TenantIdDto,
    @Body() body: UpdateUserDto,
  ): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: SUCCESS_MESSAGE.UPDATE_MESSAGE,
    };
    try {
      returnResponse.data = await this.userService.updateUser(query, body);
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }
    return returnResponse;
  }

  @Put('/:id/password')
  async updateUserPassword(
    @Param() query: TenantIdDto,
    @Body() body: UpdateUserPasswordDto,
  ): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: SUCCESS_MESSAGE.UPDATE_MESSAGE,
    };
    try {
      returnResponse.data = await this.userService.updateUserPassword(
        query,
        body,
      );
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }
    return returnResponse;
  }

  @Delete('/:id')
  deleteUserById(@Param() query: TenantIdDto): ResponseDto {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: SUCCESS_MESSAGE.DELETE_MESSAGE,
    };
    try {
      returnResponse.data = this.userService.deleteUserById(query);
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }
    return returnResponse;
  }

  // @Patch('/:id/category')
  // updateProductStatus(
  //   @Param('id') id: string,
  //   @Body('category') category: ProductCategory,
  // ): Product {
  //   return this.productService.updateProductStatus(id, category);
  // }
}
