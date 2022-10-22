import { setSeederFactory } from 'typeorm-extension';
import { CompanyEntity } from '../../entities/Company';

export default setSeederFactory(CompanyEntity, faker => {
  const company = new CompanyEntity();

  company.name = faker.company.companyName();
  company.country = faker.address.country();

  return company;
});
