import Redis from '../../modules/Redis';
import { RouteHandler } from '../../types/global';
import CompanyModule from '../../modules/Company';
import EmployeeModule from '../../modules/Employee';
import EmployeeMetadataModule from '../../modules/EmployeeMetadata';

export const updateEmployee: RouteHandler = async (
  { params: { id: uuid }, body: { companyUuid, managerUuid, name, age } },
  res,
  next,
) => {
  try {
    EmployeeModule.atLeastOneParamExists(name, age, companyUuid, managerUuid);

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

    if (company_id || manager_id || manager_id === null) {
      await EmployeeMetadataModule.updateNecessaryDocs(
        uuid,
        companyUuid,
        managerUuid,
      );
    }

    const employee = await EmployeeModule.edit({
      uuid,
      name,
      age,
      company_id,
      manager_id,
    });

    await Promise.all([
      Redis.remove(EmployeeModule.REDIS_ITEM_KEY + uuid),
      Redis.removeAll(EmployeeModule.REDIS_LIST_KEY),
    ]);

    return res
      .status(200)
      .json({ uuid: employee.uuid, name: employee.name, age: employee.age });
  } catch (error) {
    next(error);
  }
};
