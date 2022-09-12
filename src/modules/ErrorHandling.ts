import { Request, Response } from 'express';

import resDoc from '../swagger/docs/components/responses';
import { destroyQuery, updateQuery } from '../pgQueries/dynamic';
import { entity, entityUpdateProperties } from '../types/global';

export default class ErrorHandling {
  static throwError = (status: number) => {
    throw { status, message: resDoc.responses[status] };
  };

  static hitMongoOrThrow = (result: any, statusCode = 404) =>
    result || this.throwError(statusCode);

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
}
