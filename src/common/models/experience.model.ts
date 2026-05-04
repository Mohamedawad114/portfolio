import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IExperience } from '../Interfaces';

@Schema({ autoIndex: true, strict: true, strictQuery: true, timestamps: true })
export class Experience implements IExperience {
  @Prop({ type: String, required: true })
  position!: string;
  @Prop({ type: String, required: true })
  company!: string;
  @Prop({ type: Date, required: true })
  startDate!: Date;
  @Prop({ type: Date, required: false })
  endDate!: Date;
  @Prop({ type: String, required: true })
  summary!: string;
}
export type ExperienceDocument = HydratedDocument<Experience>;
const experienceSchema = SchemaFactory.createForClass(Experience);
experienceSchema.index({ _id: 1, position: 1, company: 1 });
export const experienceModel = MongooseModule.forFeature([
  {
    name: Experience.name,
    schema: experienceSchema,
  },
]);
