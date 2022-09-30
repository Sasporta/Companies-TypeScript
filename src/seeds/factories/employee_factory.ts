import { setSeederFactory } from 'typeorm-extension';
import { EmployeeEntity } from '../../entities/Employee';

export default setSeederFactory(EmployeeEntity, faker => {
  const employee = new EmployeeEntity();

  employee.name = faker.name.findName();
  employee.title = faker.name.jobTitle();

  return employee;
});
