import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { User, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAllUsers(): Promise<User> {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<any> {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
