export default {
  get: {
    tags: ['employees'],
    summary: 'get all active employees',
    description:
      `Get all employees. <br />
      If companyUuid is given, get all employees of the given company only <br />
      If managerUuid is given, get all employees of the given manager only`,
    parameters: [
      {
        $ref: '#/components/parameters/Query_OptionalCompanyUuid'
      },
      {
        $ref: '#/components/parameters/Query_OptionalManagerUuid'
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
                $ref: '#/components/schemas/EmployeeInRespond'
              }
            }
          }
        }
      },
    }
  }
}
