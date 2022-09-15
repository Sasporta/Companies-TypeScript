import { dataSource } from '../config/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { EntityType, EntityUpdateProperties } from '../types/global';

type UpdateQueryFn = (
  entity: EntityType,
  { uuid, ...params }: EntityUpdateProperties,
) => Promise<UpdateResult>;

type DestroyQueryFn = (
  entity: EntityType,
  uuid: string,
) => Promise<DeleteResult>;

export const destroyQuery: DestroyQueryFn = (entity, uuid) =>
  dataSource
    .createQueryBuilder()
    .delete()
    .from(entity)
    .where('uuid = :uuid', { uuid })
    .execute();

export const updateQuery: UpdateQueryFn = (entity, { uuid, ...params }) =>
  dataSource
    .createQueryBuilder()
    .update(entity)
    .set({ ...params })
    .where('uuid = :uuid', { uuid })
    .returning('*')
    .execute();
