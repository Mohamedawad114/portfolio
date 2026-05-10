import { IsNotEmpty, IsString, Length } from 'class-validator';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 150)
  content!: string;
}
