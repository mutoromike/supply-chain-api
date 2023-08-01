import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  Matches,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty()
  readonly phone: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
    },
  )
  @ApiProperty()
  readonly password: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly password: string;
}
