import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { UserRepository } from '../user/repository/user.repository';
import { AgentRepository } from './repository/agent.repository';

@Module({
  controllers: [AgentController],
  providers: [AgentService, UserRepository, AgentRepository],
})
export class AgentModule {}
