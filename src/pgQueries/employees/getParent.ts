import { dataSource } from '../../config/typeorm';
import { Employee } from '../../entities/Employee';

type GetEmployeeManagerFn = (employeeUuid: string) => Promise<Employee>;

export const getEmployeeManagerQuery: GetEmployeeManagerFn = employeeUuid =>
  dataSource
    .createQueryBuilder()
    .select(['manager.uuid'])
    .from(Employee, 'manager')
    .innerJoin(Employee, 'employee', 'manager.id = employee.manager_id')
    .where('employee.uuid = :employeeUuid', { employeeUuid })
    .getOne();
