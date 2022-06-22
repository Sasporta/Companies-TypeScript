import { setSeederFactory } from 'typeorm-extension';
import { Employee } from '../../entities/Employee';

export default setSeederFactory(Employee, faker => {
	const employee = new Employee();

	employee.name = faker.name.findName();
	employee.age = faker.datatype.number({ min: 20, max: 60 });

	return employee;
});
