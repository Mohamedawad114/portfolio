import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { IEducation } from 'src/common';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class AddEducation implements IEducation {
  @ApiProperty({ example: 'Mansoura University' })
  @IsString()
  @IsNotEmpty()
  university!: string;

  @ApiProperty({ example: 'Faculty of Engineering' })
  @IsString()
  @IsNotEmpty()
  college!: string;

  @ApiProperty({ type: [String], example: ['Data Structures', 'Algorithms'] })
  @IsArray()
  @IsString({ each: true })
  relativeCoursers!: string[];

  @ApiProperty({ example: 'Computer and Control Systems Engineering' })
  @IsString()
  @IsNotEmpty()
  department!: string;

  @ApiProperty({ example: 2028 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  graduationYear!: number;
}

