import TypeOrmModule from './TypeORM';
import { Company } from '../entities/Company';

class CompanyModule extends TypeOrmModule {
  REDIS_ITEM_KEY = 'get_one_company?uuid:';
  REDIS_LIST_KEY = 'get_all_companies?limit:';
  REDIS_LIST_PREFIX_KEY = 'get_all_companies';

  constructor() {
    super(Company);
  }
}

export default new CompanyModule();
