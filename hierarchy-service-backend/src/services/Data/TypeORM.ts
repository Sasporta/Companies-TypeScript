import { BaseEntity, DeepPartial, FindOptionsWhere } from 'typeorm';

import { Company } from '../../entities/Company';
import { Employee } from '../../entities/Employee';
import { destroyQuery, updateQuery } from '../../pgQueries/dynamic';
import { Entity, EntityType, EntityUpdateProperties } from '../../types/global';

type GetOneFn = (uuid: string) => Promise<Entity | null>;

type DestroyFn = (uuid: string) => Promise<boolean>;

type EditFn = (params: EntityUpdateProperties) => Promise<Entity | null>;

type SaveFn = (params: DeepPartial<Entity>) => Promise<Entity>;

class TypeORM {
  entity: any;

  constructor(entity: any) {
    this.entity = entity;
  }

  getOne: GetOneFn = async uuid =>
    (await this.entity.findOneBy({
      uuid,
    } as FindOptionsWhere<BaseEntity>)) as Entity;

  destroy: DestroyFn = async uuid =>
    (await destroyQuery(this.entity, uuid)).affected === 1;

  edit: EditFn = async params => {
    const {
      raw: [item],
      affected,
    } = await updateQuery(this.entity, params);

    return affected === 1 ? item : null;
  };

  save: SaveFn = async params => {
    const entity = this.entity.create(params);

    return await entity.save();
  };
}

export const CompanyDataManager = new TypeORM(Company);

export const EmployeeDataManager = new TypeORM(Employee);
