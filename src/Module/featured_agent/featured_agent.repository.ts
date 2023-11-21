import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Tenant } from '../Tenant/tenant.modal';
import { CreateAgentDto, TenantIdDto } from './common/dto';
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

  async getAgents(): Promise<FeatureAgent[]> {
    const featureAgent =
      await this.createQueryBuilder('feature_agent').getMany();
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

  async checkTenantById(id: string): Promise<Tenant | null> {
    const tenants = await this.tenant
      .createQueryBuilder('tenants')
      .andWhere('tenants.id = :id', { id: id })
      .getOne();
    return tenants;
  }
}
