import employees from './employees';
import companies from './companies';
import employeesMetadata from './employeesMetadata';

export default {
  paths: {
    ...employees,
    ...companies,
    ...employeesMetadata,
  },
};
