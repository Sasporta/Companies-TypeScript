import Redis from '../../services/Data/Redis';
import { RouteHandler } from '../../types/global';
import { CompanyDataManager } from '../../services/Data/TypeORM';
import CompanyService from '../../services/businessLogic/Company';

export const deleteCompany: RouteHandler = async (
  { params: { id: uuid } },
  res,
  next,
) => {
  try {
    (await CompanyDataManager.destroy(uuid)) || CompanyService.throwError(404);

    await Promise.all([
      Redis.remove(CompanyService.REDIS_ITEM_KEY + uuid),
      Redis.removeAll(CompanyService.REDIS_LIST_PREFIX_KEY),
    ]);

    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
