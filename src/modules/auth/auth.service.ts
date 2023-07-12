import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { SignInDto, SignUpDto } from './dto';
import { UsersEntity } from '../users/entities/users.entity';
import { isMatch } from 'src/utils/hashPassword';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: SignUpDto): Promise<UsersEntity> {
    return await this.usersService.createUser(createUserDto);
  }

  async signIn(loginInfo: SignInDto) {
    const { username, password } = loginInfo;

    const filteredUsers = await this.usersService.findByUserName(username);
    const passwordIsMatch = await isMatch(password, filteredUsers?.password);

    if (!passwordIsMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: filteredUsers?.id,
      username: filteredUsers?.username,
    };
    return {
      ...filteredUsers,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
