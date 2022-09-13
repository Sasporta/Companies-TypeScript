import { RouteHandler } from '../../types/global';
import CompanyModule from '../../modules/Company';
import Validation from '../../modules/Validation';
import EmployeeModule from '../../modules/Employee';

export const updateEmployee: RouteHandler = async (
  { params: { id: uuid }, body: { companyUuid, managerUuid, name, age } },
  res,
  next,
) => {
  try {
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

    return res
      .status(200)
      .json({ uuid: employee.uuid, name: employee.name, age: employee.age });
  } catch (error) {
    next(error);
  }
};
