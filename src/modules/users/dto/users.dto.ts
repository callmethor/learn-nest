import { Expose } from 'class-transformer';
import { Role } from 'src/enum/role.enum';
export class UserDto {
  @Expose()
  id?: string;

  username: string;
  roles?: Role[];
}
