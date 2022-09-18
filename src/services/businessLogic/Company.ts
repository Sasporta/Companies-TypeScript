import BaseService from './Base';

class CompanyService extends BaseService {
  REDIS_ITEM_KEY = 'get_one_company?uuid:';
  REDIS_LIST_KEY = 'get_all_companies?limit:';
  REDIS_LIST_PREFIX_KEY = 'get_all_companies';
}

export default new CompanyService();
