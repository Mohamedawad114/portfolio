import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Types } from 'mongoose';
export class AddProjectDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name!: string;
  @Length(3, 1000)
  @IsString()
  @IsNotEmpty()
  description!: string;
  @IsString()
  @IsNotEmpty()
  githubLink!: string;
  @IsString()
  @IsOptional()
  liveLink!: string;
  @IsArray()
  @IsMongoId({ each: true })
  Techs!: Types.ObjectId[];
}
