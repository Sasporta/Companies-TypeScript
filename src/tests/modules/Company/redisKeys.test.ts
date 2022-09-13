import CompanyModule from '../../../modules/Company';

describe('throwError method', () => {
  const REDIS_COMPANY_KEYS = {
    ITEM: 'get_one_company?uuid:',
    LIST: 'get_all_companies?limit:',
    LIST_PREFIX: 'get_all_companies',
  };

  it('should have the exact redis keys', () => {
    expect(CompanyModule.REDIS_ITEM_KEY).toBe(REDIS_COMPANY_KEYS.ITEM);
    expect(CompanyModule.REDIS_LIST_KEY).toBe(REDIS_COMPANY_KEYS.LIST);
    expect(CompanyModule.REDIS_LIST_PREFIX_KEY).toBe(
      REDIS_COMPANY_KEYS.LIST_PREFIX,
    );
  });
});
