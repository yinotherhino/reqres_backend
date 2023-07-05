import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AvatarDocument = HydratedDocument<Avatar>;

@Schema()
export class Avatar {
  @Prop({ required: true, type: String })
  hash: string;

  @Prop({ required: true, type: String })
  userId: string;
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);
