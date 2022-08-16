import { Request } from 'express';

import CompanyModel from '../../models/Company';
import Validation from '../../models/Validation';

export const updateCompany = async ({
	params: { id: uuid },
	body: { name, country },
}: Request) => {
	Validation.atLeastOneParamExists(name, country);

	const company = await CompanyModel.edit({ uuid, name, country });

	await Promise.all([
		CompanyModel.removeItemFromCache(uuid),
		CompanyModel.removeAllListsFromCache(),
	]);

	return {
		statusCode: 200,
		content: {
			uuid: company.uuid,
			name: company.name,
			country: company.country,
		},
	};
};
