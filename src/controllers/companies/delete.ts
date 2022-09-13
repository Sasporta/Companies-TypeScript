import { RouteHandler } from '../../types/global';
import CompanyModule from '../../modules/Company';

export const deleteCompany: RouteHandler = async (
  { params: { id: uuid } },
  res,
  next,
) => {
  try {
    await CompanyModule.destroy(uuid);

    await Promise.all([
      CompanyModule.removeItemFromCache(uuid),
      CompanyModule.removeAllListsFromCache(),
    ]);

    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
