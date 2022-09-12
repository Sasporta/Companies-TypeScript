import { RouteHandler } from '../../types/global';
import Validation from '../../modules/Validation';
import { Employee } from '../../entities/Employee';
import EmployeeModule from '../../modules/Employee';
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

    const resultsLimit = Validation.limit(+limit);

    const stringifyParams = EmployeeModule.stringifyParams({
      companyUuid,
      managerUuid,
      limit: resultsLimit,
    });

    employees = await EmployeeModule.getListFromCache(stringifyParams);

    if (!employees) {
      employees = await getAllEmployeesQuery(
        companyUuid,
        managerUuid,
        resultsLimit,
      );

      await EmployeeModule.setListInCache(stringifyParams, employees);
    }

    return res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};
