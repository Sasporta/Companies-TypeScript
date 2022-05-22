import { Employee } from '../../../entities/Employee';
import { format } from '../../../controllers/jsons/employees';

it('should return the proper employ json', () => {
  const employee = new Employee;

  employee.id = 6661;
  employee.company_id = 3;
  employee.manager_id = null;
  employee.uuid = '8dcf9fe0-b3b8-43d2-8871-0872d2814845';
  employee.name = 'new name';
  employee.age = 33;
  employee.created_at = new Date;
  employee.created_at = new Date;

  expect(format(employee)).toStrictEqual({
    uuid: employee.uuid,
    name: employee.name,
    age: employee.age,
  })
})
