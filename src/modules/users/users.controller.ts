import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Put,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './entities/users.entity';
import { UserDto } from './dto/users.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('User Controllers')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  async findAllUsers(): Promise<UsersEntity[]> {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'get profile user login' })
  @Get('me')
  async getProfile(@Request() req) {
    const userInfo: any = await this.usersService.findByUserName(
      req.user.username,
    );
    delete userInfo.password;
    delete userInfo.refresh_token;

    return userInfo;
  }

  @ApiBearerAuth()
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<any> {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @ApiBearerAuth()
  @Put('/:id')
  @ApiBody({
    type: UserDto,
    examples: {
      update_user: {
        value: {
          roles: 'admin',
          firstName: 'Torao',
          lastName: 'XXL',
          email: 'example@example.com',
        },
      },
    },
  })
  async updateUser(
    @Param('id') id: string,
    @Body() userInfo: UserDto,
  ): Promise<UserDto> {
    return await this.usersService.updateUser(id, userInfo);
  }

  @ApiBearerAuth()
  @Delete('/:id')
  async deleteUserById(@Param('id') id: string): Promise<any> {
    return await this.usersService.deleteUserById(id);
  }
}
