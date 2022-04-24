export default {
  get: {
    tags: ['companies'],
    summary: 'get company',
    description: 'Get company',
    parameters: [
      {
        $ref: '#/components/parameters/Path_Uuid'
      },
    ],
    responses: {
      200: {
        description: 'Success, item fetched',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CompanyInRespond'
            }
          }
        }
      },
      404: {
        $ref: '#/components/responses/404'
      },
    }
  }
}
