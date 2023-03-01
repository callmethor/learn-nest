import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Delete,
} from '@nestjs/common';

import { CatsService } from 'src/cats/cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    return 'dang ky thanh cong';
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('/:id')
  async show(@Param('id') id: number): Promise<Cat[]> {
    const cat = await this.catsService.findById(id);
    console.log('1111111 ~ CatsController ~ cat:', cat);
    if (!cat) {
      throw new NotFoundException();
    }

    return cat;
  }

  @Delete('/:id')
  destroy(@Param('id') id: number): Promise<any> {
    return this.catsService.delete(id);
  }
}
