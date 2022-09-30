import { getAllQuery } from '../pgQueries/employees/getAll';
import { getParentQuery } from '../pgQueries/employees/getParent';
import { getAllCousinsQuery } from '../pgQueries/employees/getAllCousins';

type StringifyParamsFn = (stringifyParams: {
  limit: number;
  companyUuid?: string;
  managerUuid?: string;
  path?: string;
  uuid?: string;
}) => string;

class Employee {
  REDIS_ITEM_KEY = 'get_one_employee?uuid:';
  REDIS_LIST_KEY = 'get_all_employees?limit:';

  getAll = getAllQuery;

  getParent = getParentQuery;

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
}

export default new Employee();
