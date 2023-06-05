import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/guard/roles.guard';
import { CatsService } from './cats.service';

import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interface';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorator/role.decorator';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.createCat(createCatDto);

    return this.catsService;
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAllCat();
  }

  @Get('/:id')
  async show(@Param('id') id: number): Promise<Cat[]> {
    const cat = await this.catsService.findCatById(id);
    if (!cat) {
      throw new NotFoundException();
    }

    return cat;
  }

  @Delete('/:id')
  destroy(@Param('id') id: number): Promise<any> {
    return this.catsService.deleteCat(id);
  }
}
