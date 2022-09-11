import { Request } from 'express';

import CompanyModule from '../../modules/Company';
import Validation from '../../modules/Validation';
import EmployeeModule from '../../modules/Employee';

export const updateEmployee = async ({
  params: { id: uuid },
  body: { companyUuid, managerUuid, name, age },
}: Request) => {
  Validation.atLeastOneParamExists(name, age, companyUuid, managerUuid);

  const { id: company_id } =
    typeof companyUuid === 'string'
      ? await CompanyModule.getOne(companyUuid, 422)
      : { id: undefined };

  const { id: manager_id } =
    typeof managerUuid === 'string'
      ? await EmployeeModule.getOne(managerUuid, 422)
      : managerUuid === null
        ? { id: null }
        : { id: undefined };

  const employee = await EmployeeModule.edit({
    uuid,
    name,
    age,
    company_id,
    manager_id,
  });

  await Promise.all([
    EmployeeModule.removeItemFromCache(uuid),
    EmployeeModule.removeAllListsFromCache(),
  ]);

  return {
    statusCode: 200,
    content: { uuid: employee.uuid, name: employee.name, age: employee.age },
  };
};
