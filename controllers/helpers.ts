import { Request, Response } from 'express';

import resDoc from '../swagger/docs/components/responses';

export const throwError = (status: number) => { throw { status, message: resDoc.responses[status] }; };

export const validateAllParamsExists = (...params: string[]) => { if (params.some(p => p === undefined)) throwError(422); };

export const validateAtLeastOneParamExists = (...params: string[]) => { if (params.every(p => p === undefined)) throwError(422); };

export const findOrThrow = async (model: any, uuid: string, statusCode: number) => await model.findOneBy({ uuid }) ?? throwError(statusCode);

export const update = (entity: object, updates: object) => Object.entries(updates).forEach(([k, v]) => { if (v !== undefined) entity[k] = v; });

export const controllerWrapper = (crudMethod: (req: Request) => Promise<{ statusCode: number, content?: object | object[] }>) => async (req: Request, res: Response) => {
  try {
    const { statusCode, content } = await crudMethod(req);

    return res.status(statusCode).json(content);
  } catch (error) {
    return res.status(error.status ?? 500).json(error.message);
  }
};
