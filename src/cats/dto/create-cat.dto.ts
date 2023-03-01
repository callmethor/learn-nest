export class CreateCatDto {
  id: number;
  name: string;
  age: number;
  breed: string;
}

export class ListAllEntities {
  limit: number;
}

export class UpdateCatDto {
  id: number;
}
