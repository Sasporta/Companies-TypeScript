import Employee from '../../../../services/Employee';

describe('throw method', () => {
  const REDIS_EMPLOYEE_KEYS = {
    ITEM: 'get_one_employee?uuid:',
    LIST: 'get_all_employees?limit:',
  };

  it('should have the exact redis keys', () => {
    expect(Employee.REDIS_ITEM_KEY).toBe(REDIS_EMPLOYEE_KEYS.ITEM);
    expect(Employee.REDIS_LIST_KEY).toBe(REDIS_EMPLOYEE_KEYS.LIST);
  });
});
