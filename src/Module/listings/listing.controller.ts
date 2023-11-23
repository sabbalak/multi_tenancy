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
export class ListingsController {
  constructor(private listingsService: ListingsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
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
      console.log(user);
      returnResponse.data = await this.listingsService.createListing(
        query,
        body,
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
      returnResponse.data = await this.listingsService.getListingById(query);
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }
    return returnResponse;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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
