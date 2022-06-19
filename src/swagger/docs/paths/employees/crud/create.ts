export default {
	post: {
		tags: ['employees'],
		summary: 'create employee',
		description: 'Create employee',
		requestBody: {
			required: true,
			content: {
				'application/json': {
					schema: {
						$ref: '#/components/schemas/EmployeeInPostRequest',
					},
				},
			},
		},
		responses: {
			201: {
				description: 'Success, item created',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/EmployeeInRespond',
						},
					},
				},
			},
			422: {
				$ref: '#/components/responses/422',
			},
		},
	},
};
