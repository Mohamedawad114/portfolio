import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IExperience, IMessage } from '../Interfaces';

@Schema({ autoIndex: true, strict: true, strictQuery: true, timestamps: true })
export class Message implements IMessage{
  @Prop({ type: String, required: true })
  senderName!: string;
  @Prop({ type: String, required: true })
  senderEmail!: string;
  @Prop({ type: String, required: true })
  subject!: string;
}
export type MessageDocument = HydratedDocument<Message>;
const messageSchema = SchemaFactory.createForClass(Message);
export const messageModel = MongooseModule.forFeature([
  {
    name: Message.name,
    schema: messageSchema,
  },
]);



