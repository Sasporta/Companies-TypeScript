export default {
	parameters: {
		Path_Uuid: {
			in: 'path',
			name: 'uuid',
			description: 'item uuid',
			required: true,
			schema: {
				$ref: '#/components/schemas/UUID',
			},
		},
		Query_OptionalCompanyUuid: {
			in: 'query',
			name: 'companyUuid',
			description: 'company uuid',
			required: false,
			schema: {
				$ref: '#/components/schemas/UUID',
			},
		},
		Query_OptionalManagerUuid: {
			in: 'query',
			name: 'companyUuid',
			description: 'company uuid',
			required: false,
			schema: {
				$ref: '#/components/schemas/UUID',
			},
		},
		Query_OptionalLimit: {
			in: 'query',
			name: 'limit',
			description: 'limit the items in the response',
			required: false,
			schema: {
				type: 'integer',
				example: 10,
			},
		},
	},
};
