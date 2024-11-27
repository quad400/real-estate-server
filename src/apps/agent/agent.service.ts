import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { AgentRepository } from './repository/agent.repository';
import { UserRepository } from '../user/repository/user.repository';
import { BaseResponse } from '../../common/response/base.response';
import { BusinessCode } from '../../common/response/response.enum';
import { QueryDto } from '../../common/query.dto';
import { v4 as uuidV4 } from 'uuid';
import { clerkClient } from '@clerk/clerk-sdk-node';

@Injectable()
export class AgentService {
  constructor(
    private readonly agentRepository: AgentRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createAgent(clerkId: string, body: CreateAgentDto) {
    let user = await this.userRepository.findOneWithoutCheck({
      user_clerk_id: clerkId,
    });

    if (!user) {
      const clerk_user = await clerkClient.users.getUser(clerkId);

      user = await this.userRepository.create({
        user_clerk_id: clerkId,
        email: clerk_user.emailAddresses[0].emailAddress,
        name: `${clerk_user.firstName} ${clerk_user.lastName}`,
      });
    }
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
