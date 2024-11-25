import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/db/abstract.schema';

export type AgentDocument = Agent & Document;

@Schema({ versionKey: false, timestamps: true })
export class Agent extends AbstractDocument {
  @Prop({ type: String })
  organization_name: string;

  @Prop({ type: String })
  organization_phone: string;

  @Prop({ type: String, ref: 'User', required: true })
  user: string;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);
