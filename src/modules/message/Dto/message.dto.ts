import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MessageData {
  @ApiProperty({ example: 'Mohamed Awad' })
  @IsString()
  @IsNotEmpty()
  senderName!: string;

  @ApiProperty({ example: 'mohamed@example.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  senderEmail!: string;

  @ApiProperty({
    example: 'Hello, I would like to inquire about your backend services.',
    minLength: 1,
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 1000)
  message!: string;
}
