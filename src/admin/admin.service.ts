import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  private userList: CreateAdminDto[] = [
    {
      id: 1,
      name: 'admin',
      email: 'admin@example.com',
      password: 'password',
      gender: 'male',
      birthday: '2022-05-05',
    },
    {
      id: 2,
      name: 'admin',
      email: 'admin@example.com',
      password: 'password',
      gender: 'male',
      birthday: '2022-05-05',
    },
  ];
  create(createAdminDto: CreateAdminDto) {
    this.userList.push(createAdminDto);
    return this.userList;
  }

  findAll() {
    return this.userList;
  }

  findOne(id: number) {
    return this.userList.filter((admin) => admin.id === id);
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
