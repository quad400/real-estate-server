import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Agent, AgentSchema } from 'src/apps/agent/model/agent.model';
import { Estate, EstateSchema } from 'src/apps/estate/model/estate.model';
import { Feedback, FeedbackSchema } from 'src/apps/estate/model/feedback.model';
import { UserSchema, User } from 'src/apps/user/model/user.model';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Agent.name, schema: AgentSchema }]),
    MongooseModule.forFeature([{ name: Estate.name, schema: EstateSchema }]),
    MongooseModule.forFeature([{ name: Feedback.name, schema: FeedbackSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Agent.name, schema: AgentSchema }]),
    MongooseModule.forFeature([{ name: Estate.name, schema: EstateSchema }]),
    MongooseModule.forFeature([{ name: Feedback.name, schema: FeedbackSchema }])
  ],
})
export class ModelModule {}
