import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IEducation,  } from '../Interfaces';

@Schema({ autoIndex: true, strict: true, strictQuery: true, timestamps: true })
export class Education implements IEducation {
  @Prop({ type: String, required: true })
  university!: string;
  @Prop({ type: String, required: true })
  college!: string;
  @Prop({ type: String, required: true })
  department!: string;
  @Prop({ type: Number, required: true })
  graduationYear!: number;
  @Prop({ type: [String], required: false })
  relativeCoursers!: string[];
}
export type EducationDocument = HydratedDocument<Education>;
const educationSchema = SchemaFactory.createForClass(Education);
export const educationModel = MongooseModule.forFeature([
  {
    name: Education.name,
    schema: educationSchema,
  },
]);
