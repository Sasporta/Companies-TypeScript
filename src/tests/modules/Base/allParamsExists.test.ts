import { ReqBodyParams } from '../../../types/global';
import CompanyService from '../../../services/businessLogic/Company';

type ValFn = (...params: ReqBodyParams[]) => void;

type ValidateFn = (
  val: ValFn,
  ...params: ReqBodyParams[]
) => 'success!' | Error;

describe('allParamsExists method', () => {
  const validate: ValidateFn = (val, ...params) => {
    try {
      val(...params);

      return 'success!';
    } catch (error) {
      return error;
    }
  };

  it('should not throw an error if all params are different then undefined', async () => {
    expect(validate(CompanyService.allParamsExists, true, 1, {}, 'yes')).toBe(
      'success!',
    );
  });

  it('should throw an error if even one of the params is undefined', async () => {
    expect(
      validate(CompanyService.allParamsExists, true, 1, {}, 'yes', undefined),
    ).toHaveProperty('status', 422);
  });
});
