import { IsEmail, IsNotEmpty, IsString, IsUrl, Matches } from 'class-validator';

export class AddContactInfo {
  @IsEmail()
  @IsNotEmpty()
  email!: string;
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  github!: string;
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  leetcode!: string;
  @IsString()
  @Matches(/^01 [0|2|1|5]\d{8}$/)
  phone!: string;
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  linkedin!: string;
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  facebook!: string;
}
