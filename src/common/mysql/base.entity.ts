import { Expose } from 'class-transformer';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Expose()
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt?: Date;

  @Expose()
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;

  @Expose()
  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt?: Date;
}
