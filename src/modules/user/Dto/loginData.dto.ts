import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDataDto {
  @IsString()
  @IsNotEmpty()
  username!: string;
  @Length(8, 64)
  @IsString()
  @IsNotEmpty()
  password!: string;
}
