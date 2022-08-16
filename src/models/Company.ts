import Redis from './Redis';
import ErrorHandling from './ErrorHandling';
import { Company } from '../entities/Company';
import { getCompany } from '../controllers/companies/getOne';
import { createCompany } from '../controllers/companies/post';
import { getCompanies } from '../controllers/companies/getAll';
import { deleteCompany } from '../controllers/companies/delete';
import { updateCompany } from '../controllers/companies/update';

export default class CompanyModel {
	static endPoints = [
		createCompany,
		deleteCompany,
		getCompany,
		getCompanies,
		updateCompany,
	];

	static companiesEps = () => CompanyModel.endPoints.map(ep =>
		ErrorHandling.controllerWrapper(ep),
	);

	static getOne = ErrorHandling.findOrThrow(Company);

	static edit = ErrorHandling.updateOrThrow404(Company);

	static destroy = ErrorHandling.deleteOrThrow404(Company);

	static getItemFromCache = async (uuid: string) =>
		await Redis.get('get_one_company?uuid:' + uuid);

	static getListFromCache = async (limit: number) =>
		await Redis.get('get_all_companies?limit:' + limit);

	static setItemInCache = async (uuid: string, value: Company) =>
		await Redis.set('get_one_company?uuid:' + uuid, value);

	static setListInCache = async (limit: number, value: Company[]) =>
		await Redis.set('get_all_companies?limit:' + limit, value);

	static removeItemFromCache = async (uuid: string) =>
		await Redis.remove('get_one_company?uuid:' + uuid);

	static removeAllListsFromCache = async () =>
		await Redis.removeAll('get_all_companies');
}
