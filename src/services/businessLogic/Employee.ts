import BaseService from './Base';
import { EmployeeMetadataDataManager } from '../Data/Mongo';
import { getAllEmployeesQuery } from '../../pgQueries/employees/getAll';
import { getAllCousinsQuery } from '../../pgQueries/employees/getAllCousins';
import { getEmployeeManagerQuery } from '../../pgQueries/employees/getParent';

type UpdateCompanyUuidFn = (
  companyUuid: string,
  employeeUuid: string,
) => Promise<void> | undefined;

type UpdatePreviousManagerFn = (
  managerUuid: string,
  employeeUuid: string,
) => Promise<void> | undefined;

type UpdateNewManagerFn = (managerUuid: string) => Promise<void> | undefined;

type StringifyParamsFn = (stringifyParams: {
  limit: number;
  companyUuid?: string;
  managerUuid?: string;
  path?: string;
  uuid?: string;
}) => string;

type UpdateCountsFn = (
  employeeUuid: string,
  companyUuid?: string,
  managerUuid?: string,
) => Promise<void | Error>;

type CreateCountFn = (
  employeeUuid: string,
  companyUuid: string,
  managerUuid: string | undefined,
) => Promise<void | Error>;

class EmployeeService extends BaseService {
  REDIS_ITEM_KEY = 'get_one_employee?uuid:';
  REDIS_LIST_KEY = 'get_all_employees?limit:';

  private updateCompanyUuid: UpdateCompanyUuidFn = async (
    companyUuid,
    employeeUuid,
  ) => {
    companyUuid &&
      (await EmployeeMetadataDataManager.edit(employeeUuid, { companyUuid }));
  };

  private updatePreviousManager: UpdatePreviousManagerFn = async (
    managerUuid,
    employeeUuid,
  ) => {
    if (managerUuid || managerUuid === null) {
      const previousManager = await getEmployeeManagerQuery(employeeUuid);

      previousManager &&
        (await EmployeeMetadataDataManager.increment(previousManager?.uuid, {
          subordinatesCount: -1,
        }));
    }
  };

  private updateNewManager: UpdateNewManagerFn = async managerUuid => {
    managerUuid &&
      (await EmployeeMetadataDataManager.increment(managerUuid, {
        subordinatesCount: 1,
      }));
  };

  getAll = getAllEmployeesQuery;

  getAllCousins = getAllCousinsQuery;

  stringifyParams: StringifyParamsFn = ({
    limit,
    companyUuid,
    managerUuid,
    path,
    uuid,
  }) => {
    let string = path ? `_${path}?uuid:${uuid}` : '';

    string += companyUuid ? `?companyUuid:${companyUuid}` : '';

    string += managerUuid ? `?managerUuid:${managerUuid}` : '';

    return string + `?limit:${limit}`;
  };

  updateCounts: UpdateCountsFn = async (
    employeeUuid,
    companyUuid,
    managerUuid,
  ) => {
    await Promise.all([
      this.updateNewManager(managerUuid),
      this.updateCompanyUuid(companyUuid, employeeUuid),
      this.updatePreviousManager(managerUuid, employeeUuid),
    ]);
  };

  createCount: CreateCountFn = async (
    employeeUuid,
    companyUuid,
    managerUuid,
  ) => {
    await Promise.all([
      this.updateNewManager(managerUuid),
      EmployeeMetadataDataManager.save(employeeUuid, companyUuid),
    ]);
  };
}

export default new EmployeeService();
