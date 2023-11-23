import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListingsStatus } from 'src/common/enums';
import { DataSource, Repository } from 'typeorm';
import { Tenant } from '../Tenant/tenant.modal';
import { CreateListingDto, TenantIdDto, UpdateListingDto } from './common/dto';
import { Listing } from './listing.modal';

@Injectable()
export class ListingRepository extends Repository<Listing> {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Tenant)
    private readonly tenant: Repository<Tenant>,
  ) {
    super(Listing, dataSource.createEntityManager());
  }

  async createListing(query: TenantIdDto, obj: CreateListingDto): Promise<any> {
    const {
      name,
      propertyLocation,
      aboutProperty,
      price,
      propertyType,
      floorSize,
      furnishing,
      addedBy,
      addedByFeatureAgent,
    } = obj;
    try {
      const isTenant = await this.checkTenantById(query.tenantId);
      if (!isTenant) {
        throw new NotFoundException(`Tenant ${query.tenantId} does not exist`);
      }
      const listingBase = this.create({
        name,
        propertyLocation,
        aboutProperty,
        price,
        propertyType,
        floorSize,
        furnishing,
        status: ListingsStatus.ACTIVE,
        addedByFeatureAgent,
        addedBy,
        tenantId: query.tenantId,
      });
      const listingResult = await this.save(listingBase);
      return listingResult;
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async getListing(tenant: TenantIdDto): Promise<Listing[]> {
    try {
      const isTenant = await this.checkTenantById(tenant.tenantId);
      if (!isTenant) {
        throw new NotFoundException(`Tenant ${tenant.tenantId} does not exist`);
      }
      const featureAgent = await this.createQueryBuilder('featured_listings')
        .andWhere('featured_listings.tenantId = :tenantId', {
          tenantId: tenant.tenantId,
        })
        .getMany();
      return featureAgent;
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async getListingById(tenant: TenantIdDto, id: string): Promise<Listing> {
    try {
      const isTenant = await this.checkTenantById(tenant.tenantId);
      if (!isTenant) {
        throw new NotFoundException(`Tenant ${tenant.tenantId} does not exist`);
      }

      const agent = await this.createQueryBuilder('featured_listings')
        .andWhere('featured_listings.tenantId = :tenantId', {
          tenantId: tenant.tenantId,
        })
        .andWhere('featured_listings.id = :id', { id })
        .getOne();
      return agent;
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async deleteListingById(tenant: TenantIdDto, id: string): Promise<void> {
    try {
      const tenants = await this.createQueryBuilder('featured_listings')
        .delete()
        .andWhere('featured_listings.tenantId = :tenantId', {
          tenantId: tenant.tenantId,
        })
        .andWhere('id = :id', { id })
        .execute();

      if (tenants.affected === 0) {
        throw new NotFoundException(`users ${id} does not exist`);
      }
    } catch (err) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
  }

  async updateListing(
    tenant: TenantIdDto,
    id: string,
    obj: UpdateListingDto,
  ): Promise<Listing> {
    const {
      name,
      propertyLocation,
      aboutProperty,
      price,
      propertyType,
      floorSize,
      furnishing,
      addedBy,
      addedByFeatureAgent,
    } = obj;
    try {
      const isTenant = await this.checkTenantById(tenant.tenantId);
      if (!isTenant) {
        throw new NotFoundException(`Tenant ${tenant.tenantId} does not exist`);
      }

      await this.createQueryBuilder()
        .update('featured_listings')
        .andWhere('featured_listings.tenantId = :tenantId', {
          tenantId: tenant.tenantId,
        })
        .andWhere('id = :id', { id })
        .set({
          ...(name ? { name } : {}),
          ...(propertyLocation ? { propertyLocation } : {}),
          ...(aboutProperty ? { aboutProperty } : {}),
          ...(price ? { price } : {}),
          ...(propertyType ? { propertyType } : {}),
          ...(floorSize ? { floorSize } : {}),
          ...(furnishing ? { furnishing } : {}),
          ...(addedBy ? { addedBy } : {}),
          ...{ addedByFeatureAgent },
        })
        .execute();

      return await this.getListingById(tenant, id);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async checkTenantById(id: string): Promise<Tenant | null> {
    const tenants = await this.tenant
      .createQueryBuilder('tenants')
      .andWhere('tenants.id = :id', { id: id })
      .getOne();
    return tenants;
  }
}
