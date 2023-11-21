import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from '../Tenant/tenant.modal';
import { TenantRepository } from '../Tenant/tenant.repository';
import { FeaturedAgentController } from './featured_agent.controller';
import { FeatureAgent } from './featured_agent.modal';
import { FeatureAgentRepository } from './featured_agent.repository';
import { FeaturedAgentService } from './featured_agent.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureAgent, Tenant, TenantRepository])],
  controllers: [FeaturedAgentController],
  providers: [FeaturedAgentService, FeatureAgentRepository],
})
export class FeaturedAgentModule {}
