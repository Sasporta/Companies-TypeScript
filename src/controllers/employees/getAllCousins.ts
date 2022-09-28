import Redis from '../../services/Data/Redis';
import { RouteHandler } from '../../types/global';
import { Employee } from '../../entities/Employee';
import EmployeeService from '../../services/businessLogic/Employee';

export const getCousins: RouteHandler = async (
  { params: { id: uuid }, query: { limit } },
  res,
  next,
) => {
  try {
    let cousins: Employee[];

    const resultsLimit = EmployeeService.limit(+limit);

    const stringifyParams = EmployeeService.stringifyParams({
      uuid,
      path: 'cousins',
      limit: resultsLimit,
    });

    cousins = await Redis.get(EmployeeService.REDIS_LIST_KEY + stringifyParams);

    if (!cousins) {
      cousins = await EmployeeService.getAllCousins(uuid, resultsLimit);

      await Redis.set(
        EmployeeService.REDIS_LIST_KEY + stringifyParams,
        cousins,
      );
    }

    return res.status(200).json(cousins);
  } catch (error) {
    next(error);
  }
};
