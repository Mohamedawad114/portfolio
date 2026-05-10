import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';
import { Gender, IUser } from 'src/common';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto implements IUser {
  @ApiProperty({ example: 'Mohamed_Awad11', minLength: 3, maxLength: 24 })
  @IsString()
  @IsOptional()
  @Length(3, 24)
  username!: string;

  @ApiProperty({ example: '2000-01-01', required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dateBirth?: Date;

  @ApiProperty({ example: 'https://drive.google.com/cv-link' })
  @IsString()
  @IsUrl()
  @IsOptional()
  CVLink!: string;

  @ApiProperty({
    example: 'StrongP@ss123',
    minLength: 8,
    maxLength: 64,
    description:
      'Password must contain uppercase, lowercase, number and special character',
  })
  @IsString()
  @Length(8, 64)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?.&_\-#])[A-Za-z\d@$!%?.&_\-#]{8,}$/,
  )
  @IsOptional()
  password!: string;
  @ApiProperty({ example: 'Backend Engineer' })
  @IsString()
  @IsOptional()
  position!: string;

  @ApiProperty({
    example: 'Experienced Node.js developer focused on scalable systems.',
    minLength: 10,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @Length(10, 100)
  bio!: string;

  @ApiProperty({
    example: 'Full details about my professional journey and technical stack.',
    minLength: 10,
    maxLength: 1500,
  })
  @IsString()
  @IsOptional()
  @Length(10, 1500)
  aboutMe!: string;

  @ApiProperty({
    example: 'Building the future of the web, one line at a time.',
    minLength: 10,
    maxLength: 500,
  })
  @IsString()
  @IsOptional()
  @Length(10, 500)
  slogan!: string;

  @ApiProperty({ enum: Gender, example: Gender.male })
  @IsEnum(Gender)
  @IsOptional()
  gender!: Gender;
}
