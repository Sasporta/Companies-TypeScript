import { findOrThrow } from '../../../controllers/helpers';

describe('findOrThrow function', () => {
  const mockFindOneBy = jest.fn();

  const mockModel = { findOneBy: mockFindOneBy };

  it('should not throw an error if the returned value is different then null or undefined', async () => {
    mockFindOneBy.mockReturnValue(true);

    expect(await findOrThrow(mockModel, '123', 404)).toBe(true);
  });

  it('should throw an error if the returned value is null or undefined', async () => {
    mockFindOneBy.mockReturnValue(null);

    const error = async () => { try { await findOrThrow(mockModel, '123', 404); } catch (error) { return error; } };

    expect(await error()).toHaveProperty('status', 404);
  });
});
