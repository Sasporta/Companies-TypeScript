export default {
	EmployeeInPatchRequest: {
		type: 'object',
		properties: {
			name: {
				$ref: '#/components/schemas/Name',
			},
			age: {
				$ref: '#/components/schemas/Age',
			},
			companyUuid: {
				$ref: '#/components/schemas/UUID',
			},
			managerUuid: {
				$ref: '#/components/schemas/UUID',
			},
		},
	},
	EmployeeInPostRequest: {
		type: 'object',
		required: ['name', 'age', 'companyUuid'],
		properties: {
			name: {
				$ref: '#/components/schemas/Name',
			},
			age: {
				$ref: '#/components/schemas/Age',
			},
			companyUuid: {
				$ref: '#/components/schemas/UUID',
			},
			managerUuid: {
				$ref: '#/components/schemas/UUID',
			},
		},
	},
	EmployeeInRespond: {
		type: 'object',
		required: ['employeeUuid', 'name', 'age', 'updatedAt', 'createdAt'],
		properties: {
			employeeUuid: {
				$ref: '#/components/schemas/UUID',
			},
			name: {
				$ref: '#/components/schemas/Name',
			},
			age: {
				$ref: '#/components/schemas/Age',
			},
			updatedAt: {
				$ref: '#/components/schemas/Timestamp',
			},
			createdAt: {
				$ref: '#/components/schemas/Timestamp',
			},
		},
	},
};
