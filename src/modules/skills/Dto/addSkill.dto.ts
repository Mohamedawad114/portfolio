import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddSkill {
  @ApiProperty({ example: 'Node.js' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 90, minimum: 60 })
  @IsNumber()
  @IsPositive()
  @Min(60)
  level!: number;

  @ApiProperty({ example: 'Backend Development' })
  @IsString()
  @IsNotEmpty()
  trackName!: string;
}

