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

    company = await CompanyModule.getItemFromCache(uuid);

    if (!company) {
      company = await CompanyModule.getOne(uuid, 404);

      await CompanyModule.setItemInCache(uuid, company);
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
