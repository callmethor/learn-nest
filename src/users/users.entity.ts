import { BaseEntity } from 'src/common/mysql/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class UsersEntity extends BaseEntity {
  @Column({ length: 500, unique: true })
  username: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'student', 'teacher'],
    default: 'student',
  })
  roles: string;

  @Column({
    default: '123456',
  })
  password: string;
}
