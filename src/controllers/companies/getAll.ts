import { Request } from 'express';

import CompanyModel from '../../models/Company';
import { Company } from '../../entities/Company';
import Validation from '../../models/Validation';
import { getAllCompaniesQuery } from '../../pgQueries/companies/getAll';

export const getCompanies = async ({ query: { limit } }: Request) => {
	let companies: Company[];

	const resultsLimit = Validation.limit(+limit);

	companies = await CompanyModel.getListFromCache(resultsLimit);

	if (!companies) {
		companies = await getAllCompaniesQuery(resultsLimit);

		await CompanyModel.setListInCache(resultsLimit, companies);
	}

	return { statusCode: 200, content: companies };
};
