import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Tenant } from "./tenant.modal";
import { CreateTenantDto, UpdateTenantDto } from "./common/dto";
import { TenantStatus } from "./common/enum";
import { TenantSettings } from "./tenant.settings.modal";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class TenantRepository extends Repository<Tenant> {

    constructor(
        private dataSource: DataSource,
        @InjectRepository(TenantSettings)
        private readonly tenantSettings: Repository<TenantSettings>,
    ) {
        super(Tenant, dataSource.createEntityManager())
    }

    async createTenant(obj: CreateTenantDto): Promise<Tenant> {
        const { name, billing, contact, userCount, currency, locale, agreementDoc } = obj;
        try {
            const tenantBase = this.create({
                name,
                billing,
                contact,
                userCount,
                status: TenantStatus.ACTIVE,
            });
            const tenantResult = await this.save(tenantBase);
      
            const tenantSettingsBase = this.tenantSettings.create({
                tenant: tenantResult.id,
                currency,
                locale,
                agreementDoc,
            });
            await this.tenantSettings.save(tenantSettingsBase);

            return tenantBase;
        } catch (err) {
            throw new ConflictException(`${name} already exists`)
        }
    }

    async getTenantById(id: string): Promise<Tenant> {
        try {
            const tenants = await this.createQueryBuilder('tenants').andWhere('tenants.id = :id', { id }).getOne();
            const tenantSettings = await this.tenantSettings.createQueryBuilder('tenant-settings').andWhere('tenant-settings.tenant = :id', { id: tenants.id }).getOne();
            tenants.tenantSettings = tenantSettings;
            return tenants;
        } catch (err) {
            throw new NotFoundException(`Tenant ${id} does not exist`);
        }
    }

    async updateTenant(id: string, obj: UpdateTenantDto): Promise<Tenant> {
        const { billing, contact, userCount, currency, locale, agreementDoc } = obj;
        try {

            if (billing || contact || userCount) {
                await this.createQueryBuilder().update('tenants').andWhere('id = :id', { id }).set({
                    ...(billing ? {billing} : {}),
                    ...(contact ? {contact} : {}),
                    ...(userCount ? {userCount} : {}),
                }).execute();
            }
           
            if (currency || locale || agreementDoc) {
                await this.tenantSettings.createQueryBuilder().update('tenant-settings', 'ts').andWhere('tenant = :id', { id }).set({
                    ...(currency ? {currency} : {}),
                    ...(locale ? {locale} : {}),
                    ...(agreementDoc ? {agreementDoc} : {}),
                }).execute();
            }

            return await this.getTenantById(id);
        } catch (err) {
            throw new NotFoundException(`Tenant ${id} does not exist`);
        }
    }

    async deleteTenantById(id: string): Promise<void> {
        const tenants = await this.createQueryBuilder('tenants').delete().andWhere('id = :id', { id }).execute();
        const tenantSettings = await this.tenantSettings.createQueryBuilder('tenant-settings').delete().andWhere('tenant = :id', { id }).execute();
  
        if (tenants.affected === 0 || tenantSettings.affected === 0) {
            throw new NotFoundException(`tenant ${id} does not exist`);
        }
    }

    async getTenants(): Promise<Tenant[]> {
        const tenants = await this.createQueryBuilder('tenants').getMany();
        const tenantsById = tenants.map(tenant => tenant.id);
        console.log(tenantsById.map( a => `'${a}'`).join(','))
        const tenantSettings = await this.tenantSettings.createQueryBuilder('tenant-settings').andWhere(`tenant IN (${tenantsById.map( a => `'${a}'`).join(',')})`).getMany();
        
        tenants.forEach(function(item) {
            item.tenantSettings = tenantSettings.find(a => a.tenant === item.id)
        })
        return tenants;
    }
}