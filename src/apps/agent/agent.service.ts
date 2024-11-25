import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { AgentRepository } from './repository/agent.repository';
import { UserRepository } from '../user/repository/user.repository';
import { BaseResponse } from 'src/common/response/base.response';
import { BusinessCode } from 'src/common/response/response.enum';
import { QueryDto } from 'src/common/query.dto';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class AgentService {
  constructor(
    private readonly agentRepository: AgentRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createAgent(clerkId: string, body: CreateAgentDto) {
    const user = await this.userRepository.findOne({ user_clerk_id: clerkId });
    await this.agentRepository.create({
      user: user._id,
      ...body,
    });
    return BaseResponse.success({
      businessCode: BusinessCode.CREATED,
      businessDescription: 'Agent Created Successfully',
    });
  }

  async getAgent(agentId: string) {
    const agent = await this.agentRepository.findOne({ _id: agentId });

    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Agent Fetched Successfully',
      data: agent,
    });
  }

  async getAgents(query: QueryDto) {
    const agents = await this.agentRepository.findPaginated({ query });

    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Agents Fetched Successfully',
      data: agents,
    });
  }
}
