export default {
  EmployeeInPatchRequest: {
    type: 'object',
    properties: {
      name: {
        $ref: '#/components/schemas/Name',
      },
      title: {
        $ref: '#/components/schemas/Title',
      },
      companyUuid: {
        $ref: '#/components/schemas/UUID',
      },
      managerUuid: {
        $ref: '#/components/schemas/UUID',
      },
    },
  },
  EmployeeInPostRequest: {
    type: 'object',
    required: ['name', 'title', 'companyUuid'],
    properties: {
      name: {
        $ref: '#/components/schemas/Name',
      },
      title: {
        $ref: '#/components/schemas/Title',
      },
      companyUuid: {
        $ref: '#/components/schemas/UUID',
      },
      managerUuid: {
        $ref: '#/components/schemas/UUID',
      },
    },
  },
  EmployeeInRespond: {
    type: 'object',
    required: ['uuid', 'name', 'title'],
    properties: {
      uuid: {
        $ref: '#/components/schemas/UUID',
      },
      name: {
        $ref: '#/components/schemas/Name',
      },
      title: {
        $ref: '#/components/schemas/Title',
      },
    },
  },
};
