import { NextFunction, Request, Response } from 'express';

import { Company } from '../entities/Company';
import { Employee } from '../entities/Employee';
import EmployeeMetadata, {
  EmployeeMetadataDocument,
} from '../models/EmployeeMetadata';

export type Model = typeof EmployeeMetadata;

export type ModelType = EmployeeMetadataDocument;

export type Entity = Company & Employee;

export type EntityType = typeof Company | typeof Employee;

export type ReqBodyParams = boolean | number | object | string | undefined;

export type CompanyUpdateProperties = {
  uuid: string;
  name?: string;
  country?: string;
};

export type EmployeeUpdateProperties = {
  uuid: string;
  name?: string;
  age?: number;
  company_id?: number;
  manager_id?: number;
};

export type EntityUpdateProperties =
  | CompanyUpdateProperties
  | EmployeeUpdateProperties;

export type EmployeeMetadataUpdateProperties = {
  companyUuid: string;
};

export type RouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<Response>;
