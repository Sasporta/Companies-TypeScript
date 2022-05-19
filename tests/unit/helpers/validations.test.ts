import { validateAllParamsExists, validateAtLeastOneParamExists } from '../../../controllers/helpers';

describe('params validations functions', () => {

  const validate = async (validateFunction: (...params: any[]) => void, ...params: any[]) => {
    try {
      validateFunction(...params);

      return 'success!'
    }
    catch (error) { return error; }
  };

  describe('validateAllParamsExists function', () => {
    it('should not throw an error if all params are different then undefined', async () => {
      expect(await validate(validateAllParamsExists, 1, 'yes', true, {}, null)).toBe('success!');
    });

    it('should throw an error if even one of the params is undefined', async () => {
      expect(await validate(validateAllParamsExists, 1, 'yes', true, {}, null, undefined)).toHaveProperty('status', 422);
    });
  });

  describe('validateAtLeastOneParamExists function', () => {
    it('should not throw an error if even one of the params is not undefined', async () => {
      expect(await validate(validateAtLeastOneParamExists, undefined, undefined, undefined, 1)).toBe('success!');
    });

    it('should throw an error only if all the params are undefined', async () => {
      expect(await validate(validateAtLeastOneParamExists, undefined, undefined, undefined)).toHaveProperty('status', 422);
    });
  });
});
