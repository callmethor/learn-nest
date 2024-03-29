import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { Public } from 'src/decorator/public.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersEntity } from '../users/entities/users.entity';
import jwt_decode from 'jwt-decode';

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOkResponse({ description: 'Login Success' })
  @ApiBody({
    type: SignInDto,
    examples: {
      user_1: {
        value: {
          username: 'admin',
          password: '123456',
        } as SignInDto,
      },
    },
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @ApiOkResponse({ description: 'Sign Up Success' })
  @ApiBody({
    type: SignUpDto,
    examples: {
      user_1: {
        value: {
          username: 'admin',
          password: '123456',
          email: 'admin@example.com',
        } as SignUpDto,
      },
    },
  })
  signup(@Body() createUserDto: SignUpDto): Promise<UsersEntity> {
    return this.authService.signUp(createUserDto);
  }

  @ApiBearerAuth()
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req) {
    //get user id from jwt token
    const user = req.user;
    return this.authService.logout(user?.sub);
  }

  @Public()
  @ApiBearerAuth()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req) {
    const refreshToken = req?.body.refreshToken;
    const user: any = jwt_decode(refreshToken);

    return this.authService.refreshToken(user?.sub, refreshToken);
  }
}
