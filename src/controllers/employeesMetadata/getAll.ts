import { Request } from 'express';

import Validation from '../../modules/Validation';
import EmployeeMetadata from '../../models/EmployeeMetaData';

export const getEmployeesMetadata = async ({
  query: { companyUuid, limit },
}: Request) => {
  const whereStatement = companyUuid ? { companyUuid } : {};

  const resultsLimit = Validation.limit(+limit);

  const employees = await EmployeeMetadata.find(whereStatement).limit(
    resultsLimit,
  );

  return { statusCode: 200, content: employees };
};
