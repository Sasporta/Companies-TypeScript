import { bodyParams } from '../../../types/global';
import Validation from '../../../models/Validation';

describe('atLeastOneParamExists method', () => {
  const validate = async (
    validateFunction: (...params: bodyParams[]) => void,
    ...params: bodyParams[]
  ) => {
    try {
      validateFunction(...params);

      return 'success!';
    } catch (error) {
      return error;
    }
  };

  it('should not throw an error if even one of the params is not undefined', async () => {
    expect(
      await validate(
        Validation.atLeastOneParamExists,
        undefined,
        undefined,
        undefined,
        1,
      ),
    ).toBe('success!');
  });

  it('should throw an error only if all the params are undefined', async () => {
    expect(
      await validate(
        Validation.atLeastOneParamExists,
        undefined,
        undefined,
        undefined,
      ),
    ).toHaveProperty('status', 422);
  });
});
