import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AuthCredentialsDto } from 'src/common/mysql/user-auth-credentials.dto';
export class SignInDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too week!',
  })
  password: string;
}

export class SignUpDto extends AuthCredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
