import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginInfo: SignInDto) {
    const user = await this.usersService.findOne(loginInfo.username);

    if (user?.password !== loginInfo.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user?.userId, username: user?.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
