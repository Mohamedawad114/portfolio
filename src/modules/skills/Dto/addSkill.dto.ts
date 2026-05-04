import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Types } from 'mongoose';

export class AddSkill {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsNumber()
  @IsPositive()
  @Min(60)
  level!: number;
  @IsString()
  @IsNotEmpty()
  trackName!: string;
}
