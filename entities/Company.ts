import { Column, Entity, OneToMany } from 'typeorm';

import { Employee } from './Employee';
import { PrimaryEntity } from './PrimaryEntity';

@Entity('companies')
export class Company extends PrimaryEntity {
  @Column({
    unique: true,
  })
  name: string;

  @Column()
  country: string;

  @OneToMany(
    () => Employee,
    employees => employees.company
  )
  employees: Employee[];
}
