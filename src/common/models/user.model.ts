import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from '../Interfaces';
import { HydratedDocument } from 'mongoose';
import { HashingService } from '../Utils';
import { Gender } from '../enum/index';

@Schema({ autoIndex: true, strict: true, strictQuery: true, timestamps: true })
export class User implements IUser {
  @Prop({ type: String, required: true })
  username!: string;
  @Prop({ type: Date, required: false })
  dateBirth!: Date;
  @Prop({ type: String, enum: Gender })
  gender!: Gender;
  @Prop({
    type: String,
    required: true,
    length: 100,
  })
  bio!: string;
  @Prop({
    type: String,
    required: true,
    length: 1500,
  })
  aboutMe!: string;
  @Prop({type: String, required: true, length: 500})
  slogan!: string;
  @Prop({
    type: String,
    required: true,
  })
  CVLink!: string;
  @Prop({
    type: String,
    required: true,
    select: false,
  })
  password!: string;
  @Prop({ type: String, required: false })
  profilePicture?: string;
  @Prop({ type: String, required: true })
  position!: string;
}
export type UserDocument = HydratedDocument<User>;
const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function () {
  const hashService = new HashingService();
  if (this.isModified('password')) {
    this.password = await hashService.generateHash(this.password);
  }
});
export const userModel = MongooseModule.forFeature([
  {
    name: User.name,
    schema: UserSchema,
  },
]);
