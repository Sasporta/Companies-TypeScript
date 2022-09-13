import { ReqBodyParams } from '../../../types/global';
import CompanyModule from '../../../modules/Company';

type ValFn = (...params: ReqBodyParams[]) => void;

type ValidateFn = (
  val: ValFn,
  ...params: ReqBodyParams[]
) => 'success!' | Error;

describe('atLeastOneParamExists method', () => {
  const validate: ValidateFn = (val, ...params) => {
    try {
      val(...params);

      return 'success!';
    } catch (error) {
      return error;
    }
  };

  it('should not throw an error if even one of the params is not undefined', async () => {
    expect(
      validate(
        CompanyModule.atLeastOneParamExists,
        undefined,
        undefined,
        undefined,
        1,
      ),
    ).toBe('success!');
  });

  it('should throw an error only if all the params are undefined', async () => {
    expect(
      validate(
        CompanyModule.atLeastOneParamExists,
        undefined,
        undefined,
        undefined,
      ),
    ).toHaveProperty('status', 422);
  });
});
