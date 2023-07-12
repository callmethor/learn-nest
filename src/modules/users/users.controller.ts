import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './entities/users.entity';
import { UserDto } from './dto/users.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags('User API')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAllUsers(): Promise<UsersEntity[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<any> {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Put('/:id')
  @ApiBody({
    type: UserDto,
    examples: {
      update_user: {
        value: {
          username: 'admin',
          password: '123456',
          roles: 'admin',
          firstName: 'Torao',
          lastName: 'XXL',
          email: 'example@example.com',
        } as UserDto,
      },
    },
  })
  async updateUser(
    @Param('id') id: string,
    @Body() userInfo: UserDto,
  ): Promise<UserDto> {
    return await this.usersService.updateUser(id, userInfo);
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: number): Promise<any> {
    return await this.usersService.deleteUserById(id);
  }
}
