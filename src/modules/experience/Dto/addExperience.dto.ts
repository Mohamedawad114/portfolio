import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { jobType } from 'src/common';

export class AddExperience {
  @ApiProperty({ example: 'Backend Engineer' })
  @IsString()
  @IsNotEmpty()
  position!: string;

  @ApiProperty({ example: 'Route Academy' })
  @IsString()
  @IsNotEmpty()
  companyName!: string;

  @ApiProperty({ example: 'Remote', enum: jobType })
  @IsString()
  @IsNotEmpty()
  @IsEnum(jobType)
  location!: jobType;

  @ApiProperty({ example: 'April 2025' })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startDate!: Date;

  @ApiProperty({ example: 'October 2025', required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  currentlyWorking!: boolean;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 400)
  summary!: string;
}
