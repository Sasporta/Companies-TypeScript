import { Employee } from '../../../entities/Employee';
import { format } from '../../../controllers/jsons/employees';

it('should return the proper employ json', () => {
  const employee = new Employee;

  employee.id = 6661;
  employee.company_id = 9991;
  employee.manager_id = null;
  employee.uuid = '5c685c36-cad4-44c6-b9cd-cc5eb153fdfe';
  employee.name = 'angela smith';
  employee.age = 33;
  employee.created_at = new Date;
  employee.created_at = new Date;

  expect(format(employee)).toStrictEqual({
    uuid: employee.uuid,
    name: employee.name,
    age: employee.age,
  })
})
