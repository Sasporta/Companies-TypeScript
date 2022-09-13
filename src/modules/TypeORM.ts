import { BaseEntity, FindOptionsWhere } from 'typeorm';

import BaseModule from './Base';
import { destroyQuery, updateQuery } from '../pgQueries/dynamic';
import { Entity, EntityType, EntityUpdateProperties } from '../types/global';

type DestroyFn = (uuid: string) => Promise<void | Error>;

type EditFn = (params: EntityUpdateProperties) => Promise<Entity & Error>;

type GetOneFn = (uuid: string, statusCode: number) => Promise<Entity & Error>;

export default class TypeOrmModule extends BaseModule {
  entity: EntityType;

  constructor(entity: EntityType) {
    super();
    this.entity = entity;
  }

  getOne: GetOneFn = async (uuid, statusCode) =>
    ((await this.entity.findOneBy({ uuid } as FindOptionsWhere<BaseEntity>)) ??
      this.throwError(statusCode)) as Entity & Error;

  destroy: DestroyFn = async uuid => {
    if ((await destroyQuery(this.entity, uuid)).affected === 0)
      this.throwError(404);
  };

  edit: EditFn = async params => {
    const {
      raw: [item],
      affected,
    } = await updateQuery(this.entity, params);

    return affected === 0 ? this.throwError(404) : item;
  };
}
