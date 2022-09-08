export default {
	get: {
		tags: ['employees'],
		summary: 'get all employees of cousin level',
		description: `Get all employees of a cousin level to the given employee. <br />
      If limit is given, the number of items in the response will be limited by the given number`,
		parameters: [
			{
				$ref: '#/components/parameters/Path_Uuid',
			},
			{
				$ref: '#/components/parameters/Query_OptionalLimit',
			},
		],
		responses: {
			200: {
				description: 'Success, items fetched',
				content: {
					'application/json': {
						schema: {
							type: 'array',
							items: {
								$ref: '#/components/schemas/EmployeeInRespond',
							},
						},
					},
				},
			},
		},
	},
};
