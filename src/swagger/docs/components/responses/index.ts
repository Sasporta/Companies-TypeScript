export default {
	responses: {
		204: {
			description: 'Successful request, no content',
		},
		404: {
			description: 'Item not Found',
		},
		422: {
			description: 'Unprocessable entity, missing or invalid parameters',
		},
	},
};
