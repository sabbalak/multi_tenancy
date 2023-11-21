import { Injectable } from '@nestjs/common';
import { CreateAgentDto, TenantIdDto, UpdateAgentDto } from './common/dto';
import { FeatureAgent } from './featured_agent.modal';
import { FeatureAgentRepository } from './featured_agent.repository';

@Injectable()
export class FeaturedAgentService {
  constructor(private featureAgentRepo: FeatureAgentRepository) {}

  getAgents(query: TenantIdDto): Promise<FeatureAgent[]> {
    return this.featureAgentRepo.getAgents(query);
  }

  createAgent(query: TenantIdDto, obj: CreateAgentDto): Promise<FeatureAgent> {
    return this.featureAgentRepo.createAgent(query, obj);
  }

  getAgentByID(query: TenantIdDto): Promise<FeatureAgent> {
    return this.featureAgentRepo.getAgentById(query, query.id);
  }

  updateAgent(query: TenantIdDto, obj: UpdateAgentDto): Promise<FeatureAgent> {
    return this.featureAgentRepo.updateAgent(query, query.id, obj);
  }

  deleteAgentById(query: TenantIdDto): Promise<void> {
    return this.featureAgentRepo.deleteUserById(query, query.id);
  }
}
