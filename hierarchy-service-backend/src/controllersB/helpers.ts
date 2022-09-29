import { Request, Response } from 'express';

import resDoc from '../swagger/docs/components/responses';

export const validateLimit = (limit: number) =>
  limit >= 1 && limit < 1000 ? limit : 10;

export const throwError = (status: number) => {
  throw { status, message: resDoc.responses[status] };
};

export const validateAllParamsExists = (...params: string[]) => {
  if (params.some(p => p === undefined)) throwError(422);
};

export const validateAtLeastOneParamExists = (...params: string[]) => {
  if (params.every(p => p === undefined)) throwError(422);
};

export const findOrThrow = async (
  model: any,
  uuid: string,
  statusCode: number,
) => (await model.findOneBy({ uuid })) ?? throwError(statusCode);

export const deleteOrThrow404 = async (table: any, uuid: string) => {
  const item = await table.findOneBy(uuid);
  if (item.affected === 0) {
    throwError(404);
  } else {
    item.delete(item.id);
  }
};

export const updateOrThrow404 = async (
  table: any,
  { uuid, ...params }: any,
) => {
  const item = await table.findOneBy(uuid);

  if (item.affected === 0) {
    throwError(404);
  }

  const {
    raw: [entity],
  } = await item.update(...params);

  return entity;
};

export const controllerWrapper =
  (
    crudMethod: (
      req: Request,
    ) => Promise<{ statusCode: number; content?: object | object[] }>,
  ) =>
    async (req: Request, res: Response) => {
      try {
        const { statusCode, content } = await crudMethod(req);

        return res.status(statusCode).json(content);
      } catch (error) {
        return res.status(error.status ?? 500).json(error.message);
      }
    };
