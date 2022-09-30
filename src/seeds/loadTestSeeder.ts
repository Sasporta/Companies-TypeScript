import { Seeder, SeederFactoryManager } from 'typeorm-extension';

import { CompanyEntity } from '../entities/Company';
import { EmployeeEntity } from '../entities/Employee';

export default class LoadTestSeeder implements Seeder {
  public async run(DS, factoryManager: SeederFactoryManager): Promise<void> {
    const companiesAmount = 1;
    const employeesLevels = 5;
    const employeesPerManager = 6;

    let CEOId = 1;

    for (let company = 0; company < companiesAmount; company++) {
      const company_id = company + 1;

      await factoryManager.get(CompanyEntity).save();
      await factoryManager.get(EmployeeEntity).save({ company_id });

      let manager_id = CEOId;

      for (let level = 0; level < employeesLevels; level++) {
        const seedsCount = employeesPerManager ** level;

        for (let seed = 0; seed < seedsCount; seed++) {
          await factoryManager
            .get(EmployeeEntity)
            .saveMany(employeesPerManager, {
              company_id,
              manager_id,
            });

          manager_id++;

          CEOId += employeesPerManager;
        }
      }

      CEOId++;
    }
  }
}
