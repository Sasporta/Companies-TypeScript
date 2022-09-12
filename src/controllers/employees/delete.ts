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
      EmployeeModule.removeItemFromCache(uuid),
      EmployeeModule.removeAllListsFromCache(),
    ]);

    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
