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

export class UpdateUserDto implements IUser {
  @IsString()
  @IsNotEmpty()
  @Length(3, 24)
  username!: string;
  @IsDate()
  @Type(() => Date)
  dateBirth?: Date;
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  CVLink!: string;
  @IsString()
  @Length(8, 64)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?.&_\-#])[A-Za-z\d@$!%?.&_\-#]{8,}$/,
  )
  password!: string;
  @IsString()
  @IsOptional()
  profilePicture?: string;
  @IsString()
  @IsNotEmpty()
  position!: string;
  @IsString()
  @IsNotEmpty()
  @Length(10, 100)
  bio!: string;
  @IsString()
  @IsNotEmpty()
  @Length(10, 1500)
  aboutMe!: string;
  @IsString()
  @IsNotEmpty()
  @Length(10, 500)
  slogan!: string;
  @IsEnum(Gender)
  gender!: Gender;
}
