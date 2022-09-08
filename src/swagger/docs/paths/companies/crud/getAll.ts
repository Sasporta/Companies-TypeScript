export default {
  get: {
    tags: ['companies'],
    summary: 'get all companies',
    description: `Get all companies. <br />
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
                $ref: '#/components/schemas/CompanyInRespond',
              },
            },
          },
        },
      },
    },
  },
};
