import { RouteHandler } from '../../types/global';
import EmployeeService from '../../services/businessLogic/Employee';
import { EmployeeMetadataDataManager } from '../../services/Data/Mongo';

export const getEmployeeMetadata: RouteHandler = async (
  { params: { id: uuid } },
  res,
  next,
) => {
  try {
    const employeeMetadata = await EmployeeMetadataDataManager.getOne(uuid);

    !employeeMetadata && EmployeeService.throwError(404);

    return res.status(200).json(employeeMetadata);
  } catch (error) {
    next(error);
  }
};
