import { Request, Response } from 'express';

import resDoc from '../swagger/docs/components/responses';
import { destroyQuery, updateQuery } from '../pgQueries/dynamic';
import { entity, entityUpdateProperties } from '../types/global';

export default class ErrorHandling {
  static throwError = (status: number) => {
    throw { status, message: resDoc.responses[status] };
  };

  static findOrThrow =
    (entity: any) => async (uuid: string, statusCode: number) =>
      (await entity.findOneBy({ uuid })) ?? this.throwError(statusCode);

  static deleteOrThrow404 = (entity: entity) => async (uuid: string) => {
    if ((await destroyQuery(entity, uuid)).affected === 0) this.throwError(404);
  };

  static updateOrThrow404 =
    (entity: entity) => async (params: entityUpdateProperties) => {
      const {
        raw: [item],
        affected,
      } = await updateQuery(entity, params);

      return affected === 0 ? this.throwError(404) : item;
    };

  static controllerWrapper =
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
        console.log(error);
        return res.status(error.status ?? 500).json(error.message);
      }
    };
}
