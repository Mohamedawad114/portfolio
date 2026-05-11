import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ISKill } from '../Interfaces';
import { HydratedDocument } from 'mongoose';

@Schema({ autoIndex: true, strict: true, strictQuery: true, timestamps: true })
export class Skill implements ISKill {
  @Prop({ type: String, required: true, unique: true })
  name!: string;
  @Prop({ type: Number, required: true, min: 0, max: 100 })
  level!: number;
  @Prop({ type: String, required: true })
  trackName!: string;
}
export type SkillDocument = HydratedDocument<Skill>;
const skillSchema = SchemaFactory.createForClass(Skill);
skillSchema.index({ _id: 1, name: 1, level: 1 });
export const skillModel = MongooseModule.forFeature([
  {
    name: Skill.name,
    schema: skillSchema,
  },
]);
