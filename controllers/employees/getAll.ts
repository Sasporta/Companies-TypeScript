import { Request } from 'express';

import { getLimit } from '../helpers';
import { Company } from '../../entities/Company';
import { dataSource } from '../../config/typeorm';
import { Employee } from '../../entities/Employee';

export const getEmployees = async ({ query: { companyUuid, managerUuid, limit } }: Request) => {
  let getAllQuery = dataSource
    .createQueryBuilder()
    .select(['employee.uuid', 'employee.name', 'employee.age'])
    .from(Employee, 'employee')

  if (companyUuid && managerUuid) {
    getAllQuery = getAllQuery
      .innerJoin(Employee, 'manager', 'employee.manager_id = manager.id')
      .innerJoin(Company, 'company', 'employee.company_id = company.id')
      .where('manager.uuid = :managerUuid', { managerUuid })
      .andWhere('company.uuid = :companyUuid', { companyUuid })
  } else if (companyUuid) {
    getAllQuery = getAllQuery
      .innerJoin(Company, 'company', 'employee.company_id = company.id')
      .where('company.uuid = :companyUuid', { companyUuid })
  } else if (managerUuid) {
    getAllQuery = getAllQuery
      .innerJoin(Employee, 'manager', 'employee.manager_id = manager.id')
      .where('manager.uuid = :managerUuid', { managerUuid })
  }

  const employees = await getAllQuery
    .limit(getLimit(+limit))
    .getMany();

  return { statusCode: 200, content: employees };
};
