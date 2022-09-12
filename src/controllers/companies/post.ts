import { Company } from '../../entities/Company';
import { RouteHandler } from '../../types/global';
import CompanyModule from '../../modules/Company';
import Validation from '../../modules/Validation';

export const createCompany: RouteHandler = async (
  { body: { name, country } },
  res,
  next,
) => {
  try {
    Validation.allParamsExists(name, country);

    const company = Company.create({ name, country });

    await company.save();

    await CompanyModule.removeAllListsFromCache();

    return res.status(201).json({
      uuid: company.uuid,
      name: company.name,
      country: company.country,
    });
  } catch (error) {
    next(error);
  }
};
