import { RouteHandler } from '../../types/global';
import Validation from '../../modules/Validation';
import EmployeeMetadata from '../../models/EmployeeMetaData';

export const getEmployeesMetadata: RouteHandler = async (
  { query: { companyUuid, limit } },
  res,
  next,
) => {
  try {
    const whereStatement = companyUuid ? { companyUuid } : {};

    const resultsLimit = Validation.limit(+limit);

    const employees = await EmployeeMetadata.find(whereStatement).limit(
      resultsLimit,
    );

    return res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};
