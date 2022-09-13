import { RouteHandler } from '../../types/global';
import CompanyModule from '../../modules/Company';
import Validation from '../../modules/Validation';

export const updateCompany: RouteHandler = async (
  { params: { id: uuid }, body: { name, country } },
  res,
  next,
) => {
  try {
    Validation.atLeastOneParamExists(name, country);

    const company = await CompanyModule.edit({ uuid, name, country });

    await Promise.all([
      CompanyModule.removeItemFromCache(uuid),
      CompanyModule.removeAllListsFromCache(),
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
