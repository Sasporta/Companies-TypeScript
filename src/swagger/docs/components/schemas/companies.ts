export default {
	CompanyInPatchRequest: {
		type: 'object',
		properties: {
			name: {
				$ref: '#/components/schemas/Name',
			},
			country: {
				$ref: '#/components/schemas/Country',
			},
		},
	},
	CompanyInPostRequest: {
		type: 'object',
		required: ['name', 'country'],
		properties: {
			name: {
				$ref: '#/components/schemas/Name',
			},
			country: {
				$ref: '#/components/schemas/Country',
			},
		},
	},
	CompanyInRespond: {
		type: 'object',
		required: ['companyUuid', 'name', 'country', 'updatedAt', 'createdAt'],
		properties: {
			companyUuid: {
				$ref: '#/components/schemas/UUID',
			},
			name: {
				$ref: '#/components/schemas/Name',
			},
			country: {
				$ref: '#/components/schemas/Country',
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
