import { Injectable } from '@nestjs/common';
import { CreateAgentDto, TenantIdDto } from './common/dto';
import { FeatureAgent } from './featured_agent.modal';
import { FeatureAgentRepository } from './featured_agent.repository';

@Injectable()
export class FeaturedAgentService {
  constructor(private featureAgentRepo: FeatureAgentRepository) {}

  getAgents(): Promise<FeatureAgent[]> {
    return this.featureAgentRepo.getAgents();
  }

  createAgent(query: TenantIdDto, obj: CreateAgentDto): Promise<FeatureAgent> {
    return this.featureAgentRepo.createAgent(query, obj);
  }
}
