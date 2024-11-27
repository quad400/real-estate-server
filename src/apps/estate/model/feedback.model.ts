import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../common/db/abstract.schema';

@Schema({ versionKey: false, timestamps: true })
export class Feedback extends AbstractDocument {
  @Prop({ type: Number, required: true })
  rate: number;

  @Prop({ type: String })
  comment: string;

  @Prop({ type: String, ref: 'User', required: true })
  user: string;

  @Prop({ type: String, ref: 'Estate', required: true })
  estate: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
