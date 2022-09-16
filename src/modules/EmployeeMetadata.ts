import Mongo from './Mongo';
import { dataSource } from '../config/typeorm';
import { Employee } from '../entities/Employee';
import EmployeeMetadata from '../models/EmployeeMetadata';

type UpdateNecessaryDocsFn = (
  employeeUuid: string,
  newCompanyUuid?: string,
  newManagerUuid?: string,
  oldManagerUuid?: string,
) => Promise<void | Error>;

class EmployeeMetadataModule extends Mongo {
  constructor() {
    super(EmployeeMetadata);
  }

  updateNecessaryDocs: UpdateNecessaryDocsFn = async (
    employeeUuid,
    newCompanyUuid,
    newManagerUuid,
  ) => {
    if (newCompanyUuid)
      await this.edit(employeeUuid, { companyUuid: newCompanyUuid });

    if (newManagerUuid || newManagerUuid === null) {
      const oldManager = await dataSource
        .createQueryBuilder()
        .select(['manager.uuid'])
        .from(Employee, 'manager')
        .innerJoin(Employee, 'employee', 'manager.id = employee.manager_id')
        .where('employee.uuid = :employeeUuid', { employeeUuid })
        .getOne();

      oldManager &&
        (await this.increment(oldManager?.uuid, { subordinatesCount: -1 }));

      newManagerUuid &&
        (await this.increment(newManagerUuid, { subordinatesCount: 1 }));


    }
  };
}

export default new EmployeeMetadataModule();
