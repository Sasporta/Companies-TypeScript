import getCompany from './crud/get';
import getCompanies from './crud/getAll';
import createCompany from './crud/create';
import updateCompany from './crud/update';
import deleteCompany from './crud/delete';

export default {
	'/companies': {
		...getCompanies,
		...createCompany,
	},
	'/companies/{id}': {
		...getCompany,
		...updateCompany,
		...deleteCompany,
	},
};
