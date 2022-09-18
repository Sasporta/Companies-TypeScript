import Redis from '../../services/Data/Redis';
import { RouteHandler } from '../../types/global';
import { CompanyDataManager } from '../../services/Data/TypeORM';
import CompanyService from '../../services/businessLogic/Company';

export const updateCompany: RouteHandler = async (
  { params: { id: uuid }, body: { name, country } },
  res,
  next,
) => {
  try {
    CompanyService.atLeastOneParamExists(name, country);

    const company = await CompanyDataManager.edit({ uuid, name, country });

    !company && CompanyService.throwError(404);

    await Promise.all([
      Redis.remove(CompanyService.REDIS_ITEM_KEY + uuid),
      Redis.removeAll(CompanyService.REDIS_LIST_PREFIX_KEY),
    ]);

    return res.status(200).json({
      uuid: company.uuid,
      name: company.name,
      country: company.country,
    });
  } catch (error) {
    next(error);
  }
};
