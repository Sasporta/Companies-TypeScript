export default {
  EmployeeMetadataInRespond: {
    type: 'object',
    required: ['uuid', 'subordinates'],
    properties: {
      uuid: {
        $ref: '#/components/schemas/UUID',
      },
      subordinates: {
        type: 'integer',
        example: 1,
      },
    },
  },
};
