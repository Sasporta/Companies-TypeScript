import { Employee } from '../../entities/Employee';

export const format = (employee: Employee) => ({
  uuid: employee.uuid,
  name: employee.name,
  age: employee.age,
})
