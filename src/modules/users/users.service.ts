import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/users.dto';
import { UsersEntity } from './entities/users.entity';
import { hashPassword } from 'src/utils/hashPassword';
import { v4 as uuidv4 } from 'uuid';

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

  async findUserById(id: string): Promise<UsersEntity> {
    const userInfo = this.usersRepository.findOneBy({
      id: id,
    });
    return userInfo;
  }

  async findAll(): Promise<UsersEntity[]> {
    return await this.usersRepository.find();
  }

  async createUser(userInfo: UsersEntity): Promise<UsersEntity> {
    const { username, password, email } = userInfo;
    const hashedPassword = await hashPassword(password);
    const uid: string = uuidv4();

    const newUser = new UsersEntity({
      username,
      password: hashedPassword,
      email,
    });

    return this.usersRepository.save(newUser);
  }

  async updateUser(id: string, userInfo: UserDto): Promise<UserDto> {
    await this.usersRepository.update(id, userInfo);
    return this.findUserById(id);
  }

  async deleteUserById(id: number): Promise<{ result: string }> {
    await this.usersRepository.softDelete(id);
    return { result: 'Deleted Success!' };
  }
}
