export default {
  get: {
    tags: ['employeesMetadata'],
    summary: "get employee's metadata",
    description: "Get employee's metadata",
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
              $ref: '#/components/schemas/EmployeeMetadataInRespond',
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
