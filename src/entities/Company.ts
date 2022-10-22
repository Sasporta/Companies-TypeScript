import { Column, Entity, OneToMany } from 'typeorm';

import { EmployeeEntity } from './Employee';
import { PrimaryEntity } from './PrimaryEntity';

@Entity('companies')
export class CompanyEntity extends PrimaryEntity {
  @Column({
    unique: true,
  })
    name: string;

  @Column()
    country: string;

  @OneToMany(() => EmployeeEntity, employees => employees.company_id)
    employees: EmployeeEntity[];
}
