import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { TenantService } from './tenant.service';
import { CreateTenantDto, UpdateTenantDto } from './common/dto';
import { ResponseDto } from 'src/common/response-dto';
import { SUCCESS_MESSAGE, RESPONSE_CODE } from 'src/common/response-data';

@Controller('tenants')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Get()
  async getTenants(): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: SUCCESS_MESSAGE.RETRIVE_MESSAGE,
    };
    try {
      returnResponse.data = await this.tenantService.getTenants();
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }

    return returnResponse;
  }

  @Get('/:id')
  async getTenantById(@Param('id') id: string): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: SUCCESS_MESSAGE.RETRIVE_MESSAGE,
    };
    try {
      returnResponse.data = await this.tenantService.getTenantById(id);
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }

    return returnResponse;
  }

  @Get('/:id/settings')
  async getTenantSettingById(@Param('id') id: string): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: SUCCESS_MESSAGE.RETRIVE_MESSAGE,
    };
    try {
      returnResponse.data = await this.tenantService.getTenantSettingById(id);
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }

    return returnResponse;
  }

  @Post()
  async createTenant(@Body() body: CreateTenantDto): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: SUCCESS_MESSAGE.CREATE_MESSAGE,
    };
    try {
      returnResponse.data = await this.tenantService.createTenant(body);
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }
    return returnResponse;
  }

  @Put('/:id')
  async updateTenant(
    @Param('id') id: string,
    @Body() body: UpdateTenantDto,
  ): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: SUCCESS_MESSAGE.UPDATE_MESSAGE,
    };
    try {
      returnResponse.data = await this.tenantService.updateTenant(id, body);
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }
    return returnResponse;
  }

  @Delete('/:id')
  deleteTenantById(@Param('id') id: string): ResponseDto {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: SUCCESS_MESSAGE.DELETE_MESSAGE,
    };
    try {
      returnResponse.data = this.tenantService.deleteTenantById(id);
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
