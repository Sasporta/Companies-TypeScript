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
		required: ['uuid', 'name', 'country'],
		properties: {
			uuid: {
				$ref: '#/components/schemas/UUID',
			},
			name: {
				$ref: '#/components/schemas/Name',
			},
			country: {
				$ref: '#/components/schemas/Country',
			},
		},
	},
};
