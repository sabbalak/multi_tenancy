import { Injectable } from '@nestjs/common';
import { Tenant } from './tenant.modal';
import { CreateTenantDto, UpdateTenantDto } from './common/dto';
import { TenantRepository } from './tenant.repository';

@Injectable()
export class TenantService {
  
    constructor(private readonly tenantRepository: TenantRepository) {}

    createTenant(obj: CreateTenantDto): Promise<Tenant> {
        return this.tenantRepository.createTenant(obj);
    }

    getTenantById(id: string): Promise<Tenant> {
        return this.tenantRepository.getTenantById(id);
    }

    updateTenant(id: string, obj: UpdateTenantDto): Promise<Tenant> {
        return this.tenantRepository.updateTenant(id, obj);
    }

    getTenants(): Promise<Tenant[]> {
        return this.tenantRepository.getTenants();
    }

    deleteTenantById(id: string): Promise<void> {
        return this.tenantRepository.deleteTenantById(id);
    }

}
 