import { Request } from 'express';

import CompanyModel from '../../models/Company';

export const deleteCompany = async ({ params: { id: uuid } }: Request) => {
	await CompanyModel.destroy(uuid);

	await Promise.all([
		CompanyModel.removeItemFromCache(uuid),
		CompanyModel.removeAllListsFromCache(),
	]);

	return { statusCode: 204 };
};
