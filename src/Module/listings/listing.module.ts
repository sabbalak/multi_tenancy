import { Module } from '@nestjs/common';
import { ListingsService } from './listing.service';
import { ListingsController } from './listing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './listing.modal';
import { ListingRepository } from './listing.repository';
import { Tenant } from '../Tenant/tenant.modal';
import { TenantRepository } from '../Tenant/tenant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Listing, Tenant, TenantRepository])],
  providers: [ListingsService, ListingRepository],
  controllers: [ListingsController],
})
export class ListingsModule {}
