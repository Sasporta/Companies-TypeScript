import Redis from '../../modules/Redis';
import { Company } from '../../entities/Company';
import { RouteHandler } from '../../types/global';
import CompanyModule from '../../modules/Company';

export const createCompany: RouteHandler = async (
  { body: { name, country } },
  res,
  next,
) => {
  try {
    CompanyModule.allParamsExists(name, country);

    const company = Company.create({ name, country });

    await company.save();

    await Redis.removeAll(CompanyModule.REDIS_LIST_PREFIX_KEY);

    return res.status(201).json({
      uuid: company.uuid,
      name: company.name,
      country: company.country,
    });
  } catch (error) {
    next(error);
  }
};
