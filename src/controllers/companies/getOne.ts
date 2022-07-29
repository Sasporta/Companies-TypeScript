import { Request } from 'express';

import CompanyModel from '../../models/Company';
import { Company } from '../../entities/Company';

export const getCompany = async ({ params: { id: uuid } }: Request) => {
	let company: Company;

	company = await CompanyModel.getItemFromCache(uuid);

	if (!company) {
		company = await CompanyModel.getOne(uuid, 404);

		await CompanyModel.setItemInCache(uuid, company);
	}

	return {
		statusCode: 200,
		content: {
			uuid: company.uuid,
			name: company.name,
			country: company.country,
		},
	};
};
