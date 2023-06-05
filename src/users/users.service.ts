import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'imthodh',
      roles: 'admin',
      password: '123456',
    },
    {
      userId: 2,
      username: 'thodh',
      roles: 'user',
      password: '123456',
    },
  ];

  async findOne(username: string): Promise<User> {
    const userInfo = this.users.find((user) => user?.username == username);
    return userInfo;
  }

  async findUserById(id: number): Promise<User> {
    const userInfo = this.users.find((user) => user?.userId == id);
    return userInfo;
  }

  async getAllUsers(): Promise<User> {
    return this.users;
  }
}
