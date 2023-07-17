import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { SignInDto, SignUpDto } from './dto';
import { Public } from 'src/decorator/public.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '../users/entities/users.entity';

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

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
  @Post('signup')
  @ApiOkResponse({ description: 'Login Success' })
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
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'get profile user login' })
  @Get('profile')
  async getProfile(@Request() req) {
    const userInfo: any = await this.usersService.findByUserName(
      req.user.username,
    );
    delete userInfo.password;

    return userInfo;
  }
}
