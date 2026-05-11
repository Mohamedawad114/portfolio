import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IProject } from '../Interfaces';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ autoIndex: true, strict: true, strictQuery: true, timestamps: true })
export class Project implements IProject {
  @Prop({ type: String, required: true, unique: true })
  name!: string;
  @Prop({ type: String, required: true, length: 1000 })
  description!: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Skill' }] })
  Techs!: Types.ObjectId[];
  @Prop({
    type: String,
    required: true,
  })
  githubLink!: string;
  @Prop({
    type: String,
    required: false,
  })
  liveLink!: string;
}
export type ProjectDocument = HydratedDocument<Project>;
const projectSchema = SchemaFactory.createForClass(Project);

export const projectModel = MongooseModule.forFeature([
  {
    name: Project.name,
    schema: projectSchema,
  },
]);
