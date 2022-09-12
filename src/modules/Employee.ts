import Redis from './Redis';
import ErrorHandling from './ErrorHandling';
import { Employee } from '../entities/Employee';

export default class EmployeeModule {
  static getOne = ErrorHandling.findOrThrow(Employee);

  static edit = ErrorHandling.updateOrThrow404(Employee);

  static destroy = ErrorHandling.deleteOrThrow404(Employee);

  static getItemFromCache = async (uuid: string) =>
    await Redis.get('get_one_employee?uuid:' + uuid);

  static getListFromCache = async (stringifyParams: string) =>
    await Redis.get('get_all_employees' + stringifyParams);

  static setItemInCache = async (uuid: string, value: Employee) =>
    await Redis.set('get_one_employee?uuid:' + uuid, value);

  static setListInCache = async (stringifyParams: string, value: Employee[]) =>
    await Redis.set('get_all_employees' + stringifyParams, value);

  static removeItemFromCache = async (uuid: string) =>
    await Redis.remove('get_one_employee?uuid:' + uuid);

  static removeAllListsFromCache = async () =>
    await Redis.removeAll('get_all_employees');

  static stringifyParams = ({
    limit,
    companyUuid,
    managerUuid,
    path,
    uuid,
  }: {
    limit: number;
    companyUuid?: string;
    managerUuid?: string;
    path?: string;
    uuid?: string;
  }) => {
    let string = path ? `_${path}?uuid:${uuid}` : '';

    string += companyUuid ? `?companyUuid:${companyUuid}` : '';

    string += managerUuid ? `?managerUuid:${managerUuid}` : '';

    return string + `?limit:${limit}`;
  };
}
