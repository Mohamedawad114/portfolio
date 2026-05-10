import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class AddProjectDto {
  @ApiProperty({ example: 'E-commerce Backend', minLength: 3, maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name!: string;

  @ApiProperty({
    example:
      'A comprehensive backend system featuring 2FA and Stripe integration.',
    minLength: 3,
    maxLength: 1000,
  })
  @Length(3, 1000)
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 'https://github.com/Mohamedawad114/project' })
  @IsString()
  @IsNotEmpty()
  githubLink!: string;

  @ApiProperty({ example: 'https://project-live-demo.com', required: false })
  @IsString()
  @IsOptional()
  liveLink!: string;

  @ApiProperty({
    type: [String],
    example: ['60d5ecb8b4877716a8c51234', '60d5ecb8b4877716a8c51235'],
    description: 'Array of MongoDB ObjectIDs for technologies',
  })
  @IsArray()
  @IsMongoId({ each: true })
  Techs!: Types.ObjectId[];
}
