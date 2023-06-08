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
import { UsersEntity } from './users.entity';
import { UserDto } from './dto/users.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User API')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAllUsers(): Promise<UsersEntity[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<any> {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post()
  async createUser(@Body() userInfo: UsersEntity): Promise<UserDto> {
    await this.usersService.createUser(userInfo);
    return await this.usersService.findByUserName(userInfo?.username);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userInfo: UserDto,
  ): Promise<UserDto> {
    return await this.usersService.updateUser(Number(id), userInfo);
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: number): Promise<any> {
    return await this.usersService.deleteUserById(id);
  }
}
