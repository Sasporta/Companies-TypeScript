import { entity } from '../types/global';
import { dataSource } from '../config/typeorm';

export const destroyQuery = (entity: entity, uuid: string) =>
	dataSource
		.createQueryBuilder()
		.delete()
		.from(entity)
		.where('uuid = :uuid', { uuid })
		.execute();

export const updateQuery = (entity: entity, { uuid, ...params }: any) =>
	dataSource
		.createQueryBuilder()
		.update(entity)
		.set({ ...params })
		.where('uuid = :uuid', { uuid })
		.returning('*')
		.execute();
