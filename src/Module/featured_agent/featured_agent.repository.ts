import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Tenant } from '../Tenant/tenant.modal';
import { CreateAgentDto, TenantIdDto, UpdateAgentDto } from './common/dto';
import { FeatureAgent } from './featured_agent.modal';

@Injectable()
export class FeatureAgentRepository extends Repository<FeatureAgent> {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Tenant)
    private readonly tenant: Repository<Tenant>,
  ) {
    super(FeatureAgent, dataSource.createEntityManager());
  }

  async getAgents(tenant: TenantIdDto): Promise<FeatureAgent[]> {
    const featureAgent = await this.createQueryBuilder('feature_agent')
      .andWhere('feature_agent.tenantId = :tenantId', {
        tenantId: tenant.tenantId,
      })
      .getMany();
    return featureAgent;
  }

  async createAgent(query: TenantIdDto, obj: CreateAgentDto): Promise<any> {
    const { agentName, contactDetails, socialMediaLink, websiteLink } = obj;
    try {
      const isTenant = await this.checkTenantById(query.tenantId);
      if (!isTenant) {
        throw new NotFoundException(`Tenant ${query.tenantId} does not exist`);
      }

      const AgentBase = this.create({
        agentName,
        contactDetails,
        socialMediaLink,
        tenantId: query.tenantId,
        websiteLink,
      });
      const UserResult = await this.save(AgentBase);

      return UserResult;
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async getAgentById(tenant: TenantIdDto, id: string): Promise<FeatureAgent> {
    console.log('id:', id);
    try {
      const isTenant = await this.checkTenantById(tenant.tenantId);
      if (!isTenant) {
        throw new NotFoundException(`Tenant ${tenant.tenantId} does not exist`);
      }

      const agent = await this.createQueryBuilder('feature_agent')
        .andWhere('feature_agent.tenantId = :tenantId', {
          tenantId: tenant.tenantId,
        })
        .andWhere('feature_agent.id = :id', { id })
        .getOne();
      return agent;
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async updateAgent(
    tenant: TenantIdDto,
    id: string,
    obj: UpdateAgentDto,
  ): Promise<FeatureAgent> {
    const { agentName, contactDetails, rating, socialMediaLink } = obj;
    try {
      const isTenant = await this.checkTenantById(tenant.tenantId);
      if (!isTenant) {
        throw new NotFoundException(`Tenant ${tenant.tenantId} does not exist`);
      }

      await this.createQueryBuilder()
        .update('feature_agent')
        .andWhere('feature_agent.tenantId = :tenantId', {
          tenantId: tenant.tenantId,
        })
        .andWhere('id = :id', { id })
        .set({
          ...(agentName ? { agentName } : {}),
          ...(contactDetails ? { contactDetails } : {}),
          ...(rating ? { rating } : {}),
          ...(socialMediaLink ? { socialMediaLink } : {}),
        })
        .execute();

      return await this.getAgentById(tenant, id);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async deleteUserById(tenant: TenantIdDto, id: string): Promise<void> {
    try {
      const tenants = await this.createQueryBuilder('feature_agent')
        .delete()
        .andWhere('feature_agent.tenantId = :tenantId', {
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

  async checkTenantById(id: string): Promise<Tenant | null> {
    const tenants = await this.tenant
      .createQueryBuilder('tenants')
      .andWhere('tenants.id = :id', { id: id })
      .getOne();
    return tenants;
  }
}
