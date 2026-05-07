import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { IEducation } from 'src/common';

export class AddEducation implements IEducation {
  @IsString()
  @IsNotEmpty()
  university!: string;
  @IsString()
  @IsNotEmpty()
  college!: string;
  @IsArray()
  @IsString({ each: true })
  relativeCoursers!: string[];
  @IsString()
  @IsNotEmpty()
  department!: string;
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  graduationYear!: number;
}
