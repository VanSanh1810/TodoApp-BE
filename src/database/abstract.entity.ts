import { PrimaryGeneratedColumn } from 'typeorm';

export class AbstractEntity<T> {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
