import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from 'src/common/mysql/base.entity';
import { Role } from 'src/enum/role.enum';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'user',
})
export class UsersEntity extends BaseEntity {
  @Expose()
  @Column({ length: 500, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  firstName?: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  lastName?: string;

  @Expose()
  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'student', 'teacher'],
    default: 'student',
  })
  roles?: Role[];

  @Exclude() // Using the class-transformer to make sure the password is excluded from results that are returned to the user
  @Column({
    default: '123456',
    type: 'varchar',
  })
  password: string;

  constructor(partial?: Partial<UsersEntity>) {
    super();
    Object.assign(this, partial);
  }
}
