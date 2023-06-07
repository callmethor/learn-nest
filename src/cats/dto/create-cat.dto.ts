import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateCatDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}

export class ListAllEntities {
  limit: number;
}

export class UpdateCatDto {
  id: number;
}
