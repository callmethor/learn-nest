import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Delete,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { CatsService } from './cats.service';

import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interface';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cat API')
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  // @Roles(Role.Admin)
  @Post()
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.createCat(createCatDto);
    return this.catsService;
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAllCat();
  }

  @Get('/:id')
  async show(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ): Promise<Cat[]> {
    const cat = await this.catsService.findCatById(id);
    if (!cat) {
      throw new NotFoundException();
    }

    return cat;
  }

  @Delete('/:id')
  destroy(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.catsService.deleteCat(id);
  }
}
