export default {
  get: {
    tags: ['employees'],
    summary: 'get all employees',
    description: `Get all employees. <br />
      If companyUuid is given, get all employees of the given company only <br />
      If managerUuid is given, get all employees of the given manager only <br />
			If limit is given, the number of items in the response will be limited by the given number`,
    parameters: [
      {
        $ref: '#/components/parameters/Query_OptionalCompanyUuid',
      },
      {
        $ref: '#/components/parameters/Query_OptionalManagerUuid',
      },
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
                $ref: '#/components/schemas/EmployeeInRespond',
              },
            },
          },
        },
      },
    },
  },
};
