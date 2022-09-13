import Redis from '../../modules/Redis';
import { RouteHandler } from '../../types/global';
import EmployeeModule from '../../modules/Employee';
import { Employee } from '../../entities/Employee';
import { getAllCousinsQuery } from '../../pgQueries/employees/getAllCousins';

export const getCousins: RouteHandler = async (
  { params: { id: uuid }, query: { limit } },
  res,
  next,
) => {
  try {
    let cousins: Employee[];

    const resultsLimit = EmployeeModule.limit(+limit);

    const stringifyParams = EmployeeModule.stringifyParams({
      uuid,
      path: 'cousins',
      limit: resultsLimit,
    });

    cousins = await Redis.get(EmployeeModule.REDIS_LIST_KEY + stringifyParams);

    if (!cousins) {
      cousins = await getAllCousinsQuery(uuid, resultsLimit);

      await Redis.set(EmployeeModule.REDIS_LIST_KEY + stringifyParams, cousins);
    }

    return res.status(200).json(cousins);
  } catch (error) {
    next(error);
  }
};
