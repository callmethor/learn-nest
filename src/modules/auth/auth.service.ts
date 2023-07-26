import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { SignInDto, SignUpDto } from './dto';
import { UsersEntity } from '../users/entities/users.entity';
import { hashPassword, isMatch } from 'src/utils/hashPassword';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async signUp(createUserDto: SignUpDto): Promise<any> {
    const { username, password, email } = createUserDto;

    // Check if user exists
    const userExists = await this.usersService.findByUserName(username);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await hashPassword(password);
    const uid: string = uuidv4();

    const newUser = new UsersEntity({
      id: uid,
      username,
      password: hashedPassword,
      email,
    });
    await this.usersRepository.save(newUser);
    const tokens = await this.getToken(newUser?.id, newUser?.username);

    await this.updateRefreshTokenHash(newUser?.id, tokens?.refresh_token);
    return tokens;
  }

  async signIn(loginInfo: SignInDto) {
    const { username, password } = loginInfo;

    const filteredUsers = await this.usersService.findByUserName(username);
    if (!filteredUsers)
      throw new UnauthorizedException('User or password invalid');
    const passwordIsMatch = await isMatch(password, filteredUsers?.password);

    if (!passwordIsMatch) {
      throw new UnauthorizedException('User or password invalid');
    }

    // get access & refresh token
    const tokens = await this.getToken(
      filteredUsers?.id,
      filteredUsers?.username,
    );
    // inject the refresh token into user table
    this.updateRefreshTokenHash(filteredUsers?.id, tokens?.refresh_token);
    delete filteredUsers?.password;

    return {
      ...filteredUsers,
      ...tokens,
    };
  }

  async logout(userId: string) {
    // if the user is logged out then clear the refresh token
    await this.usersRepository.update(userId, { refresh_token: null });
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.usersService.findUserById(userId);

    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access denied');

    const refreshTokenMatches = await isMatch(refreshToken, user.refresh_token);

    if (!refreshTokenMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getToken(user?.id, user?.username);
    await this.updateRefreshTokenHash(user?.id, tokens?.refresh_token);
    return tokens;
  }

  // function generate access & refresh token
  async getToken(userId: string, username: string) {
    const payload = {
      sub: userId,
      username,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: 60 * 15,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: 60 * 60 * 24 * 7,
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }

  async updateRefreshTokenHash(userId: string, refreshToken: string) {
    const hashToken = await hashPassword(refreshToken);
    // Inject the hashed refresh token into the user table
    await this.usersRepository.update(userId, { refresh_token: hashToken });
  }
}
