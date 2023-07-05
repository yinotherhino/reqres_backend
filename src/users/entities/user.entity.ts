import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  first_name: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop()
  last_name: number;

  @Prop()
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
