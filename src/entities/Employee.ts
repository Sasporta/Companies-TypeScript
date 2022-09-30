import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CompanyEntity } from './Company';
import { PrimaryEntity } from './PrimaryEntity';

@Entity('employees')
export class EmployeeEntity extends PrimaryEntity {
  @Column()
    name: string;

  @Column()
    title: string;

  @Column()
    company_id: number;

  @Column({
    nullable: true,
  })
    manager_id: number;

  @ManyToOne(() => CompanyEntity, company => company.employees, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'company_id',
  })
    company: CompanyEntity;
}
