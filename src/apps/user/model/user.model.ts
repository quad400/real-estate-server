import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../common/db/abstract.schema';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true, strict: false})
export class User extends AbstractDocument {
  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  user_clerk_id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
