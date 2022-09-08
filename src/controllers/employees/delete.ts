import { Request } from 'express';

import EmployeeModel from '../../models/Employee';

export const deleteEmployee = async ({ params: { id: uuid } }: Request) => {
  await EmployeeModel.destroy(uuid);

  await Promise.all([
    EmployeeModel.removeItemFromCache(uuid),
    EmployeeModel.removeAllListsFromCache(),
  ]);

  return { statusCode: 204 };
};
