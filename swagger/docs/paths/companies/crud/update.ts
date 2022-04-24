export default {
  patch: {
    tags: ['companies'],
    summary: 'update company',
    description: 'Update company',
    parameters: [
      {
        $ref: '#/components/parameters/Path_Uuid'
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CompanyInPatchRequest'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success, item updated',
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
      422: {
        $ref: '#/components/responses/422'
      },
    }
  }
}
