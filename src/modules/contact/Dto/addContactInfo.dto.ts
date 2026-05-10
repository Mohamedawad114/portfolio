import { IsEmail, IsNotEmpty, IsString, IsUrl, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddContactInfo {
  @ApiProperty({ example: 'example@mail.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'https://github.com/username' })
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  github!: string;

  @ApiProperty({ example: 'https://leetcode.com/username' })
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  leetcode!: string;

  @ApiProperty({ example: '01012345678' })
  @IsString()
  @Matches(/^01[0125]\d{8}$/)
  phone!: string;

  @ApiProperty({ example: 'https://linkedin.com/in/username' })
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  linkedin!: string;

  @ApiProperty({ example: 'https://facebook.com/username' })
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  facebook!: string;
}

