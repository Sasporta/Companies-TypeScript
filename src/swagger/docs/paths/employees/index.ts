import getEmployee from './crud/get';
import getEmployees from './crud/getAll';
import createEmployee from './crud/create';
import updateEmployee from './crud/update';
import deleteEmployee from './crud/delete';
import getCousinsEmployees from './crud/getAllCousins';

export default {
	'/employees': {
		...getEmployees,
		...createEmployee,
	},
	'/employees/{id}': {
		...getEmployee,
		...updateEmployee,
		...deleteEmployee,
	},
	'/employees/cousins/{id}': {
		...getCousinsEmployees,
	},
};
