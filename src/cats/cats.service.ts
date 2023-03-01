import { Inject, Injectable } from '@nestjs/common';
import { Cat } from './interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [
    {
      id: 1,
      name: 'Meow 1',
      age: 34,
      breed: 'Meow 1',
    },
    {
      id: 2,
      name: 'Meow 2',
      age: 33,
      breed: 'Meow 2',
    },
    {
      id: 3,
      name: 'Meow 3',
      age: 32,
      breed: 'Meow 3',
    },
  ];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findById(id: number): Cat[] {
    const cat = this.cats.filter((cat) => cat.id == id);
    return cat;
  }

  delete(id: number): any {
    const index = this.cats.findIndex((cat) => cat.id == id);
    this.cats.splice(index, 1);
    return this.cats;
  }
}
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
