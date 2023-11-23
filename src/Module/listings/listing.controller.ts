import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MESSAGE, RESPONSE_CODE } from 'src/common/response-data';
import { ResponseDto } from 'src/common/response-dto';
import { GetUser } from '../Auth/get.user.decorator';
import { TenantIdDto } from '../User/common/dto';
import { User } from '../User/user.modal';
import { CreateListingDto, UpdateListingDto } from './common/dto';
import { ListingsService } from './listing.service';

@Controller('/tenants/:tenantId/listings')
@UseGuards(AuthGuard('jwt'))
export class ListingsController {
  constructor(private listingsService: ListingsService) {}

  @Post()
  async createAgent(
    @Param() query: TenantIdDto,
    @Body() body: CreateListingDto,
    @GetUser() user: User,
  ): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: MESSAGE.CREATE_MESSAGE,
    };
    try {
      returnResponse.data = await this.listingsService.createListing(
        query,
        body,
        user,
      );
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }
    return returnResponse;
  }

  @Get()
  async getListing(@Param() query: TenantIdDto): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: MESSAGE.RETRIVE_MESSAGE,
    };
    try {
      returnResponse.data = await this.listingsService.getListing(query);
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }

    return returnResponse;
  }

  @Get('/:id')
  async getListingById(@Param() query: TenantIdDto): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: MESSAGE.RETRIVE_MESSAGE,
    };
    try {
      console.log('query:', query);
      returnResponse.data = await this.listingsService.getListingById(query);
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }
    return returnResponse;
  }

  @Delete('/:id')
  deleteListingById(@Param() query: TenantIdDto): ResponseDto {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: MESSAGE.DELETE_MESSAGE,
    };
    try {
      returnResponse.data = this.listingsService.deleteListingById(query);
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }
    return returnResponse;
  }

  @Put('/:id')
  async updateListing(
    @Param() query: TenantIdDto,
    @Body() body: UpdateListingDto,
  ): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: MESSAGE.UPDATE_MESSAGE,
    };
    try {
      returnResponse.data = await this.listingsService.updateListing(
        query,
        body,
      );
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }
    return returnResponse;
  }
}
