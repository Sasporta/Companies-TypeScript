export default {
  post: {
    tags: ['companies'],
    summary: 'create company',
    description: 'Create company',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CompanyInPostRequest'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Success, item created',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CompanyInRespond'
            }
          }
        }
      },
      422: {
        $ref: '#/components/responses/422'
      },
    }
  }
}
