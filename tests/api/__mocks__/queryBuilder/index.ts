import { dataSource } from "../../../../config/typeorm";
import { executeStatement, getManyStatement } from "./queryExecuters";
import { 
  fromAndUpdateStatement,
  limitStatement,
  selectStatement,
  setStatement,
  whereStatement,
} from "./querySetters";

const queryData = {
  limit: undefined,
  collection: undefined,
  updateData: undefined,
  conditions: undefined,
  selectedColumns: undefined,
};

const mockStatement = jest.fn().mockImplementation((method: any) => (...params: any[]) =>
  method(queryData, ...params) || mockQueryBuilder
);

export const mockQueryBuilder: any = {
  delete: mockStatement(() => {}),
  
  select: mockStatement(selectStatement),
  
  from: mockStatement(fromAndUpdateStatement),
  
  update: mockStatement(fromAndUpdateStatement),
  
  set: mockStatement(setStatement),
  
  innerJoin: mockStatement(() => {}),
  
  where: mockStatement(whereStatement),
  
  andWhere: mockStatement(whereStatement),
  
  returning: mockStatement(() => {}),
  
  limit: mockStatement(limitStatement),
  
  getMany: mockStatement(getManyStatement),
  
  execute: mockStatement(executeStatement),
};

export const resetQueryData = () => Object.keys(queryData).forEach(k => queryData[k] = undefined);

export const mockCreateQueryBuilder = () => {
  dataSource.createQueryBuilder = jest.fn().mockImplementation(() => mockQueryBuilder);
};


