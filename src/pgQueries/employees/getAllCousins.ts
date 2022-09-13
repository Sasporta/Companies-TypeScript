import { NotBrackets } from 'typeorm';

import { dataSource } from '../../config/typeorm';
import { Employee } from '../../entities/Employee';

type GetAllCousinsQueryFn = (
  uuid: string,
  limit: number,
) => Promise<Employee[]>;

export const getAllCousinsQuery: GetAllCousinsQueryFn = (uuid, limit) =>
  dataSource
    .createQueryBuilder()
    .select(['cousin.uuid', 'cousin.name', 'cousin.age'])
    .from(Employee, 'cousin')
    .innerJoin(Employee, 'parent', 'cousin.manager_id = parent.id')
    .where(qb => {
      const subQuery = qb
        .subQuery()
        .select(['parent.id'])
        .from(Employee, 'parent')
        .innerJoin(
          Employee,
          'grandparent',
          'parent.manager_id = grandparent.id',
        )
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
                .getQuery();

              return 'parent.id = ' + subQuery;
            })
            .getQuery();

          return 'grandparent.id = ' + subQuery;
        })
        .getQuery();

      return 'parent.id IN ' + subQuery;
    })
    .andWhere(
      new NotBrackets(qb => {
        qb.where(qb => {
          const subQuery = qb
            .subQuery()
            .select(['child.manager_id'])
            .from(Employee, 'child')
            .where('child.uuid = :uuid', { uuid })
            .getQuery();

          return 'cousin.manager_id = ' + subQuery;
        });
      }),
    )
    .limit(limit)
    .getMany();
