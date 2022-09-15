import Redis from '../../modules/Redis';
import { RouteHandler } from '../../types/global';
import EmployeeModule from '../../modules/Employee';

export const deleteEmployee: RouteHandler = async (
  { params: { id: uuid } },
  res,
  next,
) => {
  try {
    await EmployeeModule.destroy(uuid);

    await Promise.all([
      Redis.remove(EmployeeModule.REDIS_ITEM_KEY + uuid),
      Redis.removeAll(EmployeeModule.REDIS_LIST_KEY),
    ]);

    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
