export default {
	openapi: '3.0.0',
	info: {
		version: '1.0.0',
		title: 'Hierarchy Service API',
		description: 'This is a documentation for the hierarchy service API',
	},
	servers: [
		{
			url: 'http://localhost:3000',
			description: 'Local server',
		},
	],
	tags: [
		{
			name: 'companies',
		},
		{
			name: 'employees',
		},
		{
			name: 'employeesMetadata',
		},
	],
};
