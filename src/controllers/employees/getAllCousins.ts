import { Request } from 'express';

import Validation from '../../models/Validation';
import EmployeeModel from '../../models/Employee';
import { Employee } from '../../entities/Employee';
import { getAllCousinsQuery } from '../../pgQueries/employees/getAllCousins';

export const getCousins = async ({
  params: { id: uuid },
  query: { limit },
}: Request) => {
  let cousins: Employee[];

  const resultsLimit = Validation.limit(+limit);

  const stringifyParams = EmployeeModel.stringifyParams({
    uuid,
    path: 'cousins',
    limit: resultsLimit,
  });

  cousins = await EmployeeModel.getListFromCache(stringifyParams);

  if (!cousins) {
    cousins = await getAllCousinsQuery(uuid, resultsLimit);

    await EmployeeModel.setListInCache(stringifyParams, cousins);
  }

  return { statusCode: 200, content: cousins };
};
