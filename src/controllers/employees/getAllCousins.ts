import { Request } from 'express';
import { NotBrackets } from 'typeorm';

import { dataSource } from '../../config/typeorm';
import { getLimit } from '../helpers';
import { Employee } from '../../entities/Employee';

export const getCousins = async ({params: { id: uuid }, query: { limit } }: Request) => {
  const cousins = await dataSource
  .createQueryBuilder()
  .select(['cousin.uuid', 'cousin.name', 'cousin.age'])
  .from(Employee, 'cousin')
  .innerJoin(Employee, 'parent', 'cousin.manager_id = parent.id')
  .where(qb => {
    const subQuery = qb
      .subQuery()
      .select(['parent.id'])
      .from(Employee, 'parent')
      .innerJoin(Employee, 'grandparent', 'parent.manager_id = grandparent.id')
      .where(qb => {
        const subQuery = qb
          .subQuery()
          .select(['parent.manager_id'])
          .from(Employee, 'parent')
          .where(qb => {
            const subQuery = qb
              .subQuery()
              .select(['child.manager_id'])
              .from(Employee, 'child')
              .where('child.uuid = :uuid', { uuid })
              .getQuery()

            return 'parent.id = ' + subQuery
          })
          .getQuery()

        return 'grandparent.id = ' + subQuery
      })
      .getQuery()

    return 'parent.id IN ' + subQuery
  })
  .andWhere(
    new NotBrackets(qb => {
        qb.where(qb => {
          const subQuery = qb
            .subQuery()
            .select(['child.manager_id'])
            .from(Employee, 'child')
            .where('child.uuid = :uuid', { uuid })
            .getQuery()

          return 'cousin.manager_id = ' + subQuery
        })
    }),
  )
  .limit(getLimit(+limit))
  .getMany();

  return { statusCode: 200, content: cousins };
};