import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/db/abstract.schema';

@Schema({ versionKey: false, timestamps: true })
export class Estate extends AbstractDocument {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop({ type: String, required: true })
  price: string;

  @Prop({ type: String, required: true })
  location: string;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({ type: String })
  details: string;

  @Prop({ type: String, ref: 'Agent', required: true })
  agent: string;

  @Prop({type: Number, default: 0})
  ratings: number
}

export const EstateSchema = SchemaFactory.createForClass(Estate);
