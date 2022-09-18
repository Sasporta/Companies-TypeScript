import Redis from '../../services/Data/Redis';
import { RouteHandler } from '../../types/global';
import { Employee } from '../../entities/Employee';
import EmployeeService from '../../services/businessLogic/Employee';
import { getAllEmployeesQuery } from '../../pgQueries/employees/getAll';

export const getEmployees: RouteHandler = async (
  { query: { companyUuid, managerUuid, limit } },
  res,
  next,
) => {
  try {
    companyUuid = companyUuid as string;
    managerUuid = managerUuid as string;

    let employees: Employee[];

    const resultsLimit = EmployeeService.limit(+limit);

    const stringifyParams = EmployeeService.stringifyParams({
      companyUuid,
      managerUuid,
      limit: resultsLimit,
    });

    employees = await Redis.get(
      EmployeeService.REDIS_LIST_KEY + stringifyParams,
    );

    if (!employees) {
      employees = await getAllEmployeesQuery(
        companyUuid,
        managerUuid,
        resultsLimit,
      );

      await Redis.set(
        EmployeeService.REDIS_LIST_KEY + stringifyParams,
        employees,
      );
    }

    return res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};
