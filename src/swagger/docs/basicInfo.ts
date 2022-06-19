export default {
	openapi: '3.0.0',
	info: {
		version: '1.0.0',
		title: 'Company Hierarchy Service API',
		description:
			'This is a documentation for the company hierarchy service API',
	},
	servers: [
		{
			url: 'http://localhost:3000',
			description: 'Local server',
		},
	],
	tags: [
		{
			name: 'employees',
		},
		{
			name: 'companies',
		},
	],
};
