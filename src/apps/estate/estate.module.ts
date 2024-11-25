import { Module } from '@nestjs/common';
import { EstateService } from './estate.service';
import { EstateController } from './estate.controller';
import { UserRepository } from '../user/repository/user.repository';
import { AgentRepository } from '../agent/repository/agent.repository';
import { FeedbackRepository } from './repository/feedback.repository';
import { EstateRepository } from './repository/estate.repository';

@Module({
  controllers: [EstateController],
  providers: [
    EstateService,
    UserRepository,
    AgentRepository,
    FeedbackRepository,
    EstateRepository,
  ],
})
export class EstateModule {}
