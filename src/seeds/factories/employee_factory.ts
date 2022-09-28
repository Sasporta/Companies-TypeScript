import { setSeederFactory } from 'typeorm-extension';
import { Employee } from '../../entities/Employee';

export default setSeederFactory(Employee, faker => {
  const employee = new Employee();

  employee.name = faker.name.findName();
  employee.title = faker.name.jobTitle();

  return employee;
});
