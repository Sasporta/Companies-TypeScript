export default {
	patch: {
		tags: ['employees'],
		summary: 'update employee',
		description: 'Update employee',
		parameters: [
			{
				$ref: '#/components/parameters/Path_Uuid',
			},
		],
		requestBody: {
			required: true,
			content: {
				'application/json': {
					schema: {
						$ref: '#/components/schemas/EmployeeInPatchRequest',
					},
				},
			},
		},
		responses: {
			200: {
				description: 'Success, item updated',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/EmployeeInRespond',
						},
					},
				},
			},
			404: {
				$ref: '#/components/responses/404',
			},
			422: {
				$ref: '#/components/responses/422',
			},
		},
	},
};
