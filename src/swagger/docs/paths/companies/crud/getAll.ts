export default {
  get: {
    tags: ['companies'],
    summary: 'get all companies',
    description: 'Get all companies',
    responses: {
      200: {
        description: 'Success, items fetched',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/CompanyInRespond'
              }
            }
          }
        }
      },
    }
  }
}
