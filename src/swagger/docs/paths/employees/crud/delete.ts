export default {
	delete: {
		tags: ['employees'],
		summary: 'delete employee',
		description: 'Delete employee',
		parameters: [
			{
				$ref: '#/components/parameters/Path_Uuid',
			},
		],
		responses: {
			204: {
				$ref: '#/components/responses/204',
			},
			404: {
				$ref: '#/components/responses/404',
			},
		},
	},
};
