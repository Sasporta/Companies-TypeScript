import { Company } from './entities/Company';
import { dataSource } from './config/typeorm';
import { Employee } from './entities/Employee';
import { getLimit } from './controllers/helpers';

const fn1 = async (managerUuid: string, companyUuid: string) => {
  await dataSource.initialize();

  const employees = await dataSource
    .createQueryBuilder()
    .select(['employee.uuid', 'employee.name', 'employee.age'])
    .from(Employee, 'employee')
    .innerJoin(Employee, 'manager', 'employee.manager_id = manager.id')
    .innerJoin(Company, 'company', 'employee.company_id = company.id')
    .where('manager.uuid = :manager_uuid', { manager_uuid: managerUuid })
    .andWhere('company.uuid = :company_uuid', { company_uuid: companyUuid })
    .limit(getLimit(10))
    .getMany();

  return employees;
};

const fn2 = async(managerUuid: string, companyUuid: string) => {
  await dataSource.initialize();

  const company = typeof companyUuid === 'string' ? await Company.findOneBy({ uuid: companyUuid }) : null;

  const manager = typeof managerUuid === 'string' ? await Employee.findOneBy({ uuid: managerUuid }) : null;

  const employees = await Employee.find({ where: { company_id: company?.id, manager_id: manager?.id } });

  return employees;
};

[1,2,3,4,5,6,7,8,9,10].forEach(async i => {
  console.time('get' + i)
  const employees = await fn1('fc71df46-38fa-4ef0-9fc9-2c78d464f047', '62ce835b-5285-4ae2-a8d7-c2db89e5a363');
  console.timeEnd('get' + i)
});
