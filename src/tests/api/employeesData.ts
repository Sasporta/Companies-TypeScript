import fs from 'fs';

import { existingCompanies } from './companiesData';

export const existingEmployees = fs
  .readFileSync('./src/seeds/seed_employees.sql')
  .toString()
  .split('VALUES\n')[1]
  .split('\n')
  .reduce((a, c, i) => {
    const data =  c
      .slice(c.indexOf('(') + 1, c.indexOf(')'))
      .replaceAll(/[\s']/g, '')
      .split(',');

    return [
      ...a,
      {
        id: i + 1,
        uuid: data[0],
        name: data[1],
        age: +data[2],
        company_id: +data[3],
        manager_id: +data[4] || null,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      }
    ];
  }, []);

export const employeesPath = '/employees';

export const postedEmployee = {
  name: 'PostedEmployee',
  age: 100,
  companyUuid: existingCompanies[3].uuid,
  managerUuid: existingEmployees[2].uuid,
}

export const postedManager = {
  name: 'PostedManager',
  age: 200,
  companyUuid: existingCompanies[3].uuid,
  managerUuid: null,
}

export const updatedEmployee = {
  age: 300,
}

export const updatedEmployeeToManager = {
  managerUuid: null,
}
