import { BaseEntity, DataSource, DeepPartial, FindOptionsWhere } from 'typeorm';

import { dataSource } from '../config/typeorm';
import { CompanyEntity } from '../entities/Company';
import { EmployeeEntity } from '../entities/Employee';
import { destroyQuery, updateQuery } from '../pgQueries/dynamic';
import { Entity, EntityType, EntityUpdateProperties } from '../types/global';

type GetOneFn = (uuid: string) => Promise<Entity | null>;

type DestroyFn = (uuid: string) => Promise<boolean>;

type EditFn = (params: EntityUpdateProperties) => Promise<Entity | null>;

type SaveFn = (params: DeepPartial<Entity>) => Promise<Entity>;

class Postgres {
  entity: any;
  static dataSource: DataSource;

  constructor(entity: any) {
    this.entity = entity;
  }

  static connect = async () => {
    try {
      this.dataSource = await dataSource.initialize();

      console.log('TypeORM with Postgres has been connected!');
    } catch (error) {
      console.error('Error during TypeORM with Postgres connection ', error);
    }
  };

  static disconnect = async () => await dataSource.destroy();

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

export const CompanyPostgres = new Postgres(CompanyEntity);

export const EmployeePostgres = new Postgres(EmployeeEntity);

export default Postgres;
