import getEmployeeMetadata from './crud/get';
import getEmployeesMetadata from './crud/getAll';

export default {
	'/employeesMetadata': {
		...getEmployeesMetadata,
	},
	'/employeesMetadata/{id}': {
		...getEmployeeMetadata,
	},
};
