import { ReqBodyParams } from '../types/global';
import resDoc from '../swagger/docs/components/responses';

type LimitFn = (limit: number) => number;

type ThrowErrorFn = (status: number) => Error;

type AllParamsExistsFn = (...params: ReqBodyParams[]) => void | Error;

type AtLeastOneParamExistsFn = (...params: ReqBodyParams[]) => void | Error;

export default class BaseModule {
  throwError: ThrowErrorFn = status => {
    throw { status, message: resDoc.responses[status] };
  };

  limit: LimitFn = limit => (limit >= 1 && limit < 1000 ? limit : 10);

  allParamsExists: AllParamsExistsFn = (...params) => {
    if (params.some(p => p === undefined)) this.throwError(422);
  };

  atLeastOneParamExists: AtLeastOneParamExistsFn = (...params) => {
    if (params.every(p => p === undefined)) this.throwError(422);
  };
}
