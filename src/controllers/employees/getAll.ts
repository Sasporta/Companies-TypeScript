import { Request } from 'express';

import Validation from '../../modules/Validation';
import EmployeeModule from '../../modules/Employee';
import { Employee } from '../../entities/Employee';
import { getAllEmployeesQuery } from '../../pgQueries/employees/getAll';

export const getEmployees = async ({
  query: { companyUuid, managerUuid, limit },
}: Request) => {
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

  return { statusCode: 200, content: employees };
};
