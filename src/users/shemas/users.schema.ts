import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  //   id: number;
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: false })
  role: 'ADMIN' | 'INTERN' | 'ENGINEER';
}

export const UserSchema = SchemaFactory.createForClass(User);
