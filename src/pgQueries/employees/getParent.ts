import { dataSource } from '../../config/typeorm';
import { EmployeeEntity } from '../../entities/Employee';

type getParentQueryFn = (employeeUuid: string) => Promise<EmployeeEntity>;

export const getParentQuery: getParentQueryFn = employeeUuid =>
  dataSource
    .createQueryBuilder()
    .select(['manager.uuid'])
    .from(EmployeeEntity, 'manager')
    .innerJoin(EmployeeEntity, 'employee', 'manager.id = employee.manager_id')
    .where('employee.uuid = :employeeUuid', { employeeUuid })
    .getOne();
