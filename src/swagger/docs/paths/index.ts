import employees from './employees';
import companies from './companies';

export default {
	paths: {
		...employees,
		...companies,
	},
};
