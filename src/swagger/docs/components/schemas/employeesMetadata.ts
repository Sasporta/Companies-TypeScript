export default {
  EmployeeMetadataInRespond: {
    type: 'object',
    required: ['uuid', 'subordinatesCount'],
    properties: {
      uuid: {
        $ref: '#/components/schemas/UUID',
      },
      subordinatesCount: {
        type: 'integer',
        example: 1,
      },
    },
  },
};
