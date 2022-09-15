import Redis from '../../modules/Redis';
import { Company } from '../../entities/Company';
import { RouteHandler } from '../../types/global';
import CompanyModule from '../../modules/Company';

export const getCompany: RouteHandler = async (
  { params: { id: uuid } },
  res,
  next,
) => {
  try {
    let company: Company;

    company = await Redis.get(CompanyModule.REDIS_ITEM_KEY + uuid);

    if (!company) {
      company = await CompanyModule.getOne(uuid, 404);

      await Redis.set(CompanyModule.REDIS_ITEM_KEY + uuid, company);
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
