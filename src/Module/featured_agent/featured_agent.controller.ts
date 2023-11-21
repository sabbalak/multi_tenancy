import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RESPONSE_CODE, MESSAGE } from 'src/common/response-data';
import { ResponseDto } from 'src/common/response-dto';
import { CreateAgentDto, TenantIdDto, UpdateAgentDto } from './common/dto';
import { FeaturedAgentService } from './featured_agent.service';

@Controller('/tenants/:tenantId/agents')
export class FeaturedAgentController {
  constructor(private featureAgentService: FeaturedAgentService) {}

  @Get()
  async getAgents(@Param() query: TenantIdDto): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: MESSAGE.RETRIVE_MESSAGE,
    };
    try {
      returnResponse.data = await this.featureAgentService.getAgents(query);
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }

    return returnResponse;
  }

  @Get('/:id')
  async getAgentById(@Param() query: TenantIdDto): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: MESSAGE.RETRIVE_MESSAGE,
    };
    try {
      console.log('query:', query);
      returnResponse.data = await this.featureAgentService.getAgentByID(query);
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }
    return returnResponse;
  }

  @Post()
  async createAgent(
    @Param() query: TenantIdDto,
    @Body() body: CreateAgentDto,
  ): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: MESSAGE.CREATE_MESSAGE,
    };
    try {
      returnResponse.data = await this.featureAgentService.createAgent(
        query,
        body,
      );
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }
    return returnResponse;
  }

  @Put('/:id')
  async updateUser(
    @Param() query: TenantIdDto,
    @Body() body: UpdateAgentDto,
  ): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: MESSAGE.UPDATE_MESSAGE,
    };
    try {
      returnResponse.data = await this.featureAgentService.updateAgent(
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
  deleteAgentById(@Param() query: TenantIdDto): ResponseDto {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: MESSAGE.DELETE_MESSAGE,
    };
    try {
      returnResponse.data = this.featureAgentService.deleteAgentById(query);
    } catch (error) {
      returnResponse.message = error.response.message;
      returnResponse.statusCode = error.response.statusCode;
    }
    return returnResponse;
  }
}
