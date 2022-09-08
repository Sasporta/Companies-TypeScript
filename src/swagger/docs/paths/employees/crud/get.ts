export default {
  get: {
    tags: ['employees'],
    summary: 'get employee',
    description: 'Get employee',
    parameters: [
      {
        $ref: '#/components/parameters/Path_Uuid',
      },
    ],
    responses: {
      200: {
        description: 'Success, item fetched',
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
    },
  },
};
