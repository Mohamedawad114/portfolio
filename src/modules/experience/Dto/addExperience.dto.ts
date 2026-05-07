import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { IExperience } from "src/common";

export class AddExperience implements IExperience {
  @IsString()
  @IsNotEmpty()
  position!: string;
  @IsString()
  @IsNotEmpty()
  company!: string;
  @IsDate()
  @Type(() => Date)
  startDate!: Date;
  @IsDate()
  @Type(() => Date)
  endDate!: Date;
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  summary!: string;
}