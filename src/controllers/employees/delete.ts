import Redis from '../../services/Data/Redis';
import { RouteHandler } from '../../types/global';
import { EmployeeDataManager } from '../../services/Data/TypeORM';
import EmployeeService from '../../services/businessLogic/Employee';

export const deleteEmployee: RouteHandler = async (
  { params: { id: uuid } },
  res,
  next,
) => {
  try {
    await EmployeeService.deleteCount(uuid);

    (await EmployeeDataManager.destroy(uuid)) ||
      EmployeeService.throwError(404);

    await Promise.all([
      Redis.remove(EmployeeService.REDIS_ITEM_KEY + uuid),
      Redis.removeAll(EmployeeService.REDIS_LIST_KEY),
    ]);

    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
