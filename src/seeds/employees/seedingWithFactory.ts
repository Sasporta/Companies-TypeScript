import { Seeder, SeederFactoryManager } from 'typeorm-extension';

import { Employee } from '../../entities/Employee';

export default class EmployeeWithFactorySeeder implements Seeder {
	public async run(DS, factoryManager: SeederFactoryManager): Promise<any> {

		await factoryManager.get(Employee).saveMany(10);
	}
}
