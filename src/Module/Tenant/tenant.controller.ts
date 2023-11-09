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
import { Tenant } from './common/interface';
import { CreateTenantDto, UpdateTenantDto } from './common/dto';
import { TenantSettings } from './tenant.settings.modal';

@Controller('tenants')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Get()
  getTenants(): Promise<Tenant[]> {
    return this.tenantService.getTenants();
  }

  @Get('/:id')
  getTenantById(@Param('id') id: string): Promise<Tenant> {
    return this.tenantService.getTenantById(id);
  }

  @Get('/:id/settings')
  getTenantSettingById(@Param('id') id: string): Promise<TenantSettings> {
    return this.tenantService.getTenantSettingById(id);
  }

  @Post()
  createTenant(@Body() body: CreateTenantDto): Promise<Tenant> {
    return this.tenantService.createTenant(body);
  }

  @Put('/:id')
  updateTenant(
    @Param('id') id: string,
    @Body() body: UpdateTenantDto,
  ): Promise<Tenant> {
    return this.tenantService.updateTenant(id, body);
  }

  @Delete('/:id')
  deleteTenantById(@Param('id') id: string): Promise<void> {
    return this.tenantService.deleteTenantById(id);
  }

  // @Patch('/:id/category')
  // updateProductStatus(
  //   @Param('id') id: string,
  //   @Body('category') category: ProductCategory,
  // ): Product {
  //   return this.productService.updateProductStatus(id, category);
  // }
}
