export default {
  EmployeeMetadataInRespond: {
    type: 'object',
    required: ['_id', 'subordinatesCount'],
    properties: {
      _id: {
        $ref: '#/components/schemas/UUID',
      },
      subordinatesCount: {
        type: 'integer',
        example: 1,
      },
    },
  },
};
