import { get } from '../../helpers';
import { PATH } from '../../api/testsData';

describe('controllerWrapper method', () => {
  it('should throw an error if something wrong and unexpected happened', async () => {
    const { status, body } = await get(PATH.COMPANIES);

    expect(status).toBe(500);
    expect(body).toStrictEqual(
      'Class constructor Company cannot be invoked without \'new\'',
    );
  });
});
