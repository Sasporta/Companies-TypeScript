import { RouteHandler } from '../../types/global';
import EmployeeMetadata from '../../models/EmployeeMetadata';
import EmployeeMetadataModule from '../../modules/EmployeeMetadata';

export const getEmployeesMetadata: RouteHandler = async (
  { query: { companyUuid, limit } },
  res,
  next,
) => {
  try {
    const whereStatement = companyUuid ? { companyUuid } : {};

    const resultsLimit = EmployeeMetadataModule.limit(+limit);

    const employees = await EmployeeMetadata.find(whereStatement).limit(
      resultsLimit,
    );

    return res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};
