import ErrorHandling from './ErrorHandling';
import { bodyParams } from '../types/global';

export default class Validation {
  static limit = (limit: number) => (limit >= 1 && limit < 1000 ? limit : 10);

  static allParamsExists = (...params: bodyParams[]) => {
    if (params.some(p => p === undefined)) ErrorHandling.throwError(422);
  };

  static atLeastOneParamExists = (...params: bodyParams[]) => {
    if (params.every(p => p === undefined)) ErrorHandling.throwError(422);
  };
}
