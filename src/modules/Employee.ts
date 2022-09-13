import TypeOrmModule from './TypeORM';
import { Employee } from '../entities/Employee';

type StringifyParamsFn = (stringifyParams: {
  limit: number;
  companyUuid?: string;
  managerUuid?: string;
  path?: string;
  uuid?: string;
}) => string;

class EmployeeModule extends TypeOrmModule {
  REDIS_ITEM_KEY: 'get_one_employee?uuid:';
  REDIS_LIST_KEY: 'get_all_employees?limit:';

  constructor() {
    super(Employee);
    this.REDIS_ITEM_KEY = 'get_one_employee?uuid:';
    this.REDIS_LIST_KEY = 'get_all_employees?limit:';
  }

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
}

export default new EmployeeModule();
