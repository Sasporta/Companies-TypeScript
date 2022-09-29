import { setSeederFactory } from 'typeorm-extension';
import { Company } from '../../entities/Company';

export default setSeederFactory(Company, faker => {
  const company = new Company();

  company.name = faker.company.companyName();
  company.country = faker.address.country();

  return company;
});
