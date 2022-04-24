import getEmployee from './crud/get';
import getEmployees from './crud/getAll';
import createEmployee from './crud/create';
import updateEmployee from './crud/update';
import deleteEmployee from './crud/delete';

export default {
  '/employees':{
    ...getEmployees,
    ...createEmployee
  },
  '/employees/{id}':{
    ...getEmployee,
    ...updateEmployee,
    ...deleteEmployee
  }
}
