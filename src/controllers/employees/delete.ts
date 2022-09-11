import { Request } from 'express';

import EmployeeModule from '../../modules/Employee';

export const deleteEmployee = async ({ params: { id: uuid } }: Request) => {
  await EmployeeModule.destroy(uuid);

  await Promise.all([
    EmployeeModule.removeItemFromCache(uuid),
    EmployeeModule.removeAllListsFromCache(),
  ]);

  return { statusCode: 204 };
};
