import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class MessageData {
  @IsString()
  @IsNotEmpty()
  senderName!: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  senderEmail!: string;
  @IsString()
  @IsNotEmpty()
  @Length(1, 1000)
  message!: string;
}
