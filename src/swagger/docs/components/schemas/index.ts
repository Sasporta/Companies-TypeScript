import employees from './employees';
import companies from './companies';

export default {
	schemas: {
		UUID: {
			type: 'string',
			format: 'UUIDV4',
			example: 'a2d4e87f-5a6a-47eb-90ea-09b9e3252d7e',
		},
		Age: {
			type: 'integer',
			example: 1,
		},
		Name: {
			type: 'string',
			example: 'wix',
		},
		Country: {
			type: 'string',
			example: 'USA',
		},
		Timestamp: {
			type: 'string',
			format: 'date-time YYYY-MM-DDTHH:MM:SS.000Z',
			example: '2018-10-10T12:41:17.000Z',
		},
		...employees,
		...companies,
	},
};
