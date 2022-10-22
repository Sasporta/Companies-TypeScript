export default {
  delete: {
    tags: ['companies'],
    summary: 'delete company',
    description: 'Delete company',
    parameters: [
      {
        $ref: '#/components/parameters/Path_Uuid',
      },
    ],
    responses: {
      204: {
        $ref: '#/components/responses/204',
      },
      404: {
        $ref: '#/components/responses/404',
      },
    },
  },
};
