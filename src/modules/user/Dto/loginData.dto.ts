import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDataDto {
  @ApiProperty({ example: 'Mohamed_Awad11' })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({
    example: 'StrongP@ss123',
    minLength: 8,
    maxLength: 64,
    format: 'password',
  })
  @Length(8, 64)
  @IsString()
  @IsNotEmpty()
  password!: string;
}
