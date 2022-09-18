import CompanyService from '../../../services/businessLogic/Company';
describe('validateLimit method', () => {
  it('should return the limit is its a valid value (between 1 to 10)', async () => {
    expect(CompanyService.limit(5)).toBe(5);
  });

  it('should return the default limit value (10) if param is invalid', async () => {
    expect(CompanyService.limit(0)).toBe(10);
    expect(CompanyService.limit(NaN)).toBe(10);
    expect(CompanyService.limit(1001)).toBe(10);
  });
});
