export class CreateCatDto {
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
