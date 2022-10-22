import { NextFunction, Request, Response } from 'express';

import { CompanyEntity } from '../entities/Company';
import { EmployeeEntity } from '../entities/Employee';
import EmployeeMetadata, {
  EmployeeMetadataDocument,
} from '../models/EmployeeMetadata';

export type Model = typeof EmployeeMetadata;

export type ModelType = EmployeeMetadataDocument;

export type Entity = CompanyEntity & EmployeeEntity;

export type EntityType = typeof CompanyEntity | typeof EmployeeEntity;

type CompanyUpdateProperties = {
  uuid: string;
  name?: string;
  country?: string;
};

type EmployeeUpdateProperties = {
  uuid: string;
  name?: string;
  title?: string;
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
) => Promise<Response> | void;
