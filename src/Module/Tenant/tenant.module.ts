import { Module } from '@nestjs/common';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { TenantRepository } from './tenant.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './tenant.modal';
import { TenantSettings } from './tenant.settings.modal';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        Tenant,
        TenantSettings,
    ]),
  ],
  controllers: [ TenantController],
  providers: [ TenantService, TenantRepository],
})
export class  TenantModule {}