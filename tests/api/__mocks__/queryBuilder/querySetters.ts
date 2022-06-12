import { Company } from "../../../../entities/Company";
import { Employee } from "../../../../entities/Employee";
import { existingCompanies } from "../entities/CompaniesData";
import { existingEmployees } from "../entities/EmployeesData";

export const fromAndUpdateStatement = (queryData: { collection: object[] }, model: any) => {
  switch (model) {
    case Company:
      queryData.collection = existingCompanies;
      break;
    case Employee:
      queryData.collection = existingEmployees;
      break;
  }
}

export const limitStatement = (queryData: { limit: number }, limit: number) => {
  queryData.limit = limit;
}

export const selectStatement = (queryData: { selectedColumns: string[] }, traits: string[]) => {
  queryData.selectedColumns = traits.map(t => t.split('.')[1]);
}

export const setStatement = (queryData: { updateData: object }, { ...params }: { params: any[] }) => {
  queryData.updateData = { ...params };
}

export const whereStatement = (queryData: { conditions: object }, stringCondition: string, uuidObj: object) => {
  const uuidType = stringCondition.split(':')[1];

  queryData.conditions = { ...queryData.conditions, [uuidType]: uuidObj[uuidType] };
}