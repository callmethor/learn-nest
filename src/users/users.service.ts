import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async findByUserName(username: string): Promise<UsersEntity> {
    const userInfo = this.usersRepository.findOneBy({
      username: username,
    });
    return userInfo;
  }

  async findUserById(id: number): Promise<UsersEntity> {
    const userInfo = this.usersRepository.findOneBy({
      id: id,
    });
    return userInfo;
  }

  async findAll(): Promise<UsersEntity[]> {
    return await this.usersRepository.find();
  }

  async createUser(userInfo: UsersEntity): Promise<UsersEntity> {
    return this.usersRepository.save(userInfo);
    // return this.usersRepository.findOne({ where: { userId: userInfo.userId } });
  }

  async updateUser(id: number, userInfo: UserDto): Promise<UserDto> {
    await this.usersRepository.update(id, userInfo);
    return this.findUserById(id);
  }

  async deleteUserById(id: number): Promise<{ result: string }> {
    await this.usersRepository.softDelete(id);
    return { result: 'Deleted Success!' };
  }
}
