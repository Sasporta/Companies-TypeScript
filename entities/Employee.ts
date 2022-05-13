import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Company } from './Company';
import { PrimaryEntity } from './PrimaryEntity';

@Entity('employees')
export class Employee extends PrimaryEntity {
  @Column()
  name: string

  @Column()
  age: number

  @Column({
    nullable: true
  })
  manager_id: number

  @ManyToOne(
    () => Company,
    company => company.employees,
    {
      onDelete: 'CASCADE',
    }
  )

  @JoinColumn({
    name: 'company_id'
  })
  company_id: number

  static toJson({ uuid, name, age }: Employee) {
    return { uuid, name, age }
  }

  static arrayToJson(employees: Employee[]) {
    return employees.map(({ uuid, name, age }) => ({ uuid, name, age }));
  }
}
