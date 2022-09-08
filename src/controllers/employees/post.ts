import { Request } from 'express';

import CompanyModel from '../../models/Company';
import Validation from '../../models/Validation';
import EmployeeModel from '../../models/Employee';
import { Employee } from '../../entities/Employee';

export const createEmployee = async ({
  body: { name, age, companyUuid, managerUuid },
}: Request) => {
  Validation.allParamsExists(name, age, companyUuid);

  const { id: company_id } = await CompanyModel.getOne(companyUuid, 422);

  const { id: manager_id } =
    typeof managerUuid === 'string'
      ? await EmployeeModel.getOne(managerUuid, 422)
      : { id: null };

  const employee = Employee.create({ name, age, company_id, manager_id });

  await employee.save();

  await EmployeeModel.removeAllListsFromCache();

  return {
    statusCode: 201,
    content: { uuid: employee.uuid, name: employee.name, age: employee.age },
  };
};
