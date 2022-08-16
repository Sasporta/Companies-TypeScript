import { Company } from '../../entities/Company';
import { dataSource } from '../../config/typeorm';

export const getAllCompaniesQuery = (limit: number) =>
	dataSource
		.createQueryBuilder()
		.from(Company, 'company')
		.select(['company.uuid', 'company.name', 'company.country'])
		.limit(limit)
		.getMany();
