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
}
