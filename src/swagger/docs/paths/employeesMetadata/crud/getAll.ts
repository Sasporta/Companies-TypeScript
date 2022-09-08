export default {
	get: {
		tags: ['employeesMetadata'],
		summary: 'get all employees metadata',
		description: `Get all employees metadata. <br />
			If limit is given, the number of items in the response will be limited by the given number`,
		parameters: [
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
								$ref: '#/components/schemas/EmployeeMetadataInRespond',
							},
						},
					},
				},
			},
		},
	},
};
