import Redis from '../../services/Data/Redis';
import { Company } from '../../entities/Company';
import { RouteHandler } from '../../types/global';
import { CompanyDataManager } from '../../services/Data/TypeORM';
import CompanyService from '../../services/businessLogic/Company';

export const getCompany: RouteHandler = async (
  { params: { id: uuid } },
  res,
  next,
) => {
  try {
    let company: Company;

    company = await Redis.get(CompanyService.REDIS_ITEM_KEY + uuid);

    if (!company) {
      company = (await CompanyDataManager.getOne(uuid));

      !company && CompanyService.throwError(404);

      await Redis.set(CompanyService.REDIS_ITEM_KEY + uuid, company);
    }

    return res.status(200).json({
      uuid: company.uuid,
      name: company.name,
      country: company.country,
    });
  } catch (error) {
    next(error);
  }
};
