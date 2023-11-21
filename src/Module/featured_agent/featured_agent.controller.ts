import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RESPONSE_CODE, MESSAGE } from 'src/common/response-data';
import { ResponseDto } from 'src/common/response-dto';
import { CreateAgentDto, TenantIdDto } from './common/dto';
import { FeaturedAgentService } from './featured_agent.service';

@Controller('/tenants/:tenantId/agents')
export class FeaturedAgentController {
  constructor(private featureAgentService: FeaturedAgentService) { }

  @Get()
  async getAgents(): Promise<ResponseDto> {
    const returnResponse: ResponseDto = {
      statusCode: RESPONSE_CODE.SUCCESS,
      message: MESSAGE.RETRIVE_MESSAGE,
    };
    try {
      returnResponse.data = await this.featureAgentService.getAgents();
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
}
