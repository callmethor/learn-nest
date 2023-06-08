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
import { SignInDto } from './dto';
import { Public } from 'src/decorator/public.decorator';
import { UsersService } from 'src/users/users.service';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Login API')
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
          password: '1232@asdS',
        } as SignInDto,
      },
    },
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'get profile user login' })
  @Get('profile')
  getProfile(@Request() req) {
    const userInfo: any = this.usersService.findByUserName(req.user.username);
    return userInfo;
  }
}
