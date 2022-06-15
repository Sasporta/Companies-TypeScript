import { Request } from 'express';

import { dataSource } from '../../config/typeorm';
import { findOrThrow, getLimit } from '../helpers';
import { Employee } from '../../entities/Employee';

export const getCousins = async ({params: { id: uuid }, query: { limit } }: Request) => {
  const child = await findOrThrow(Employee, uuid.toString(), 404);

  const parent = await Employee.findOneBy({id: child.manager_id});
  console.log(parent);

  const grandParent = await Employee.findOneBy({id: parent.manager_id});

  let allParents = await dataSource
    .createQueryBuilder()
    .select(['employee.id'])
    .from(Employee, 'employee')
    .innerJoin(Employee, 'manager', 'employee.manager_id = manager.id')
    .where('manager.id = :id', { id: grandParent.id })
    .limit(getLimit(+limit))
    .getMany();


    const unclesIds = allParents.reduce((a, { id }) => id !== parent.id ? [...a, id] : a, []);

  let cousins = await dataSource
    .createQueryBuilder()
    .select(['employee.uuid', 'employee.name', 'employee.age'])
    .from(Employee, 'employee')
    .innerJoin(Employee, 'manager', 'employee.manager_id = manager.id')
    .where('manager.id IN (:...ids)', { ids: [...unclesIds] })
    .limit(getLimit(+limit))
    .getMany();

  return { statusCode: 200, content: cousins };
};