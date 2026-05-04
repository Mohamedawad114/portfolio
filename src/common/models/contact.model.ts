import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IContact } from '../Interfaces';
import { HydratedDocument } from 'mongoose';

@Schema({ autoIndex: true, strict: true, strictQuery: true, timestamps: true, })
export class ContactInfo implements IContact {
  @Prop({ type: String, required: true })
  email!: string;
  @Prop({ type: String, required: true })
  github!: string;
  @Prop({ type: String, required: true })
  leetcode!: string;
  @Prop({ type: String, required: true })
  facebook!: string;
  @Prop({ type: String, required: true })
  linkedin!: string;
  @Prop({ type: String, required: true })
  phone!: string;
}
export type ContactDocument = HydratedDocument<ContactInfo>;
const contactSchema = SchemaFactory.createForClass(ContactInfo);
export const contactModel = MongooseModule.forFeature([
  {
    name: ContactInfo.name,
    schema: contactSchema,
  },
]);
