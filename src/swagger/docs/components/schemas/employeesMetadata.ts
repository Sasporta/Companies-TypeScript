export default {
  EmployeeMetadataInRespond: {
    type: 'object',
    required: ['employeeUuid', 'subordinatesCount'],
    properties: {
      employeeUuid: {
        $ref: '#/components/schemas/UUID',
      },
      subordinatesCount: {
        type: 'integer',
        example: 1,
      },
    },
  },
};
