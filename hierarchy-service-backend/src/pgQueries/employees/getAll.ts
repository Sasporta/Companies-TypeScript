import { Company } from '../../entities/Company';
import { dataSource } from '../../config/typeorm';
import { Employee } from '../../entities/Employee';

type GetAllEmployeesQueryFn = (
  companyUuid: string,
  managerUuid: string,
  limit: number,
) => Promise<Employee[]>;

export const getAllEmployeesQuery: GetAllEmployeesQueryFn = (
  companyUuid,
  managerUuid,
  limit,
) => {
  let getAllQuery = dataSource
    .createQueryBuilder()
    .select(['employee.uuid', 'employee.name', 'employee.title'])
    .from(Employee, 'employee');

  if (companyUuid && managerUuid) {
    getAllQuery =
      managerUuid === 'null'
        ? getAllQuery
          .innerJoin(Company, 'company', 'employee.company_id = company.id')
          .where('company.uuid = :companyUuid', { companyUuid })
          .andWhere('employee.manager_id is null')
        : getAllQuery
          .innerJoin(Employee, 'manager', 'employee.manager_id = manager.id')
          .innerJoin(Company, 'company', 'employee.company_id = company.id')
          .where('manager.uuid = :managerUuid', { managerUuid })
          .andWhere('company.uuid = :companyUuid', { companyUuid });
  } else if (companyUuid) {
    getAllQuery = getAllQuery
      .innerJoin(Company, 'company', 'employee.company_id = company.id')
      .where('company.uuid = :companyUuid', { companyUuid });
  } else if (managerUuid) {
    getAllQuery =
      managerUuid === 'null'
        ? getAllQuery.where('employee.manager_id is null')
        : getAllQuery
          .innerJoin(Employee, 'manager', 'employee.manager_id = manager.id')
          .where('manager.uuid = :managerUuid', { managerUuid });
  }

  return getAllQuery.limit(limit).getMany();
};
