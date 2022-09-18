import { RouteHandler } from '../../types/global';
import EmployeeService from '../../services/businessLogic/Employee';
import { EmployeeMetadataDataManager } from '../../services/Data/Mongo';

export const getEmployeesMetadata: RouteHandler = async (
  { query: { companyUuid, limit } },
  res,
  next,
) => {
  try {
    const whereStatement = companyUuid
      ? { companyUuid: companyUuid as string }
      : {};

    const resultsLimit = EmployeeService.limit(+limit);

    const employees = await EmployeeMetadataDataManager.getAll(
      whereStatement,
      resultsLimit,
    );

    return res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};
