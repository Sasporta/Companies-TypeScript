import Redis from '../../modules/Redis';
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
      Redis.remove(CompanyModule.REDIS_ITEM_KEY + uuid),
      Redis.removeAll(CompanyModule.REDIS_LIST_PREFIX_KEY),
    ]);

    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
