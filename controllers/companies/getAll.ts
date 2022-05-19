import { format } from '../jsons/companies';
import { Company } from '../../entities/Company';

export const getCompanies = async () => {
  const companies = await Company.find();

  return { statusCode: 200, content: companies.map(c => format(c)) };
};
