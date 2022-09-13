import Redis from '../../modules/Redis';
import { RouteHandler } from '../../types/global';
import CompanyModule from '../../modules/Company';

export const updateCompany: RouteHandler = async (
  { params: { id: uuid }, body: { name, country } },
  res,
  next,
) => {
  try {
    CompanyModule.atLeastOneParamExists(name, country);

    const company = await CompanyModule.edit({ uuid, name, country });

    await Promise.all([
      Redis.remove(CompanyModule.REDIS_ITEM_KEY + uuid),
      Redis.removeAll(CompanyModule.REDIS_LIST_PREFIX_KEY),
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
