import { RouteHandler } from '../../types/global';
import EmployeeMetadataModule from '../../modules/EmployeeMetadata';


export const getEmployeeMetadata: RouteHandler = async (
  { params: { id: uuid } },
  res,
  next,
) => {
  try {
    const employeeMetadata = await EmployeeMetadataModule.getOne(uuid);

    return res.status(200).json(employeeMetadata);
  } catch (error) {
    next(error);
  }
};
