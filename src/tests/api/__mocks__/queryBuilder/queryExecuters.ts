import { resetQueryData } from ".";
import { existingCompanies } from "../entities/CompaniesData";
import { existingEmployees } from "../entities/EmployeesData";

export const executeStatement = (
  queryData: {
    collection: { uuid: string }[],
    conditions: { uuid: string },
    limit: number,
    updateData: object,
  }
) => {
  const { collection, conditions: { uuid }, updateData } = queryData;

  const response = { affected: 0, raw: [null] };

  const record = collection.find(r => r.uuid === uuid);

  if(record) {
    if (updateData) {
      Object.keys(updateData).forEach(key => {
        if(updateData[key] !== undefined) record[key] = updateData[key];
      });
    }

    response.affected = 1;
    response.raw = [record];
  }

  resetQueryData();

  return response;
}

export const getManyStatement = (
  queryData: {
    collection: { company_id?: number, manager_id?: number }[],
    conditions: { companyUuid?: string, managerUuid?: string },
    limit: number,
    selectedColumns: string[] ,
  }
) => {
  const { collection, conditions, limit, selectedColumns } = queryData;

  let newCollection = collection;

  if(conditions?.companyUuid) {
    const company =  existingCompanies.find(c => c.uuid === conditions.companyUuid);

    newCollection = newCollection.filter(e => e.company_id === company?.id);
  }

  if(conditions?.managerUuid !== undefined) {
    if(conditions?.managerUuid === null) {
      newCollection = newCollection.filter(e => e.manager_id === null);
    } else {
      const manager = existingEmployees.find(e => e.uuid === conditions.managerUuid);

      newCollection = newCollection.filter(e => e.manager_id === manager?.id);
    }
  }

  resetQueryData();

  return newCollection
  .slice(0, limit)
  .map(r => selectedColumns.reduce((a, c) => ({ ...a, [c]: r[c] }), {}))
}