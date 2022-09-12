import { NextFunction, Request, Response } from 'express';

import { Company } from '../entities/Company';
import { Employee } from '../entities/Employee';

export type entity = typeof Company | typeof Employee;

export type entities = Company | Employee | Company[] | Employee[];

export type bodyParams = boolean | number | object | string | undefined;

type CompanyUpdateProperties = {
  uuid: string;
  name?: string;
  country?: string;
};

type EmployeeUpdateProperties = {
  uuid: string;
  name?: string;
  age?: number;
  company_id?: number;
  manager_id?: number;
};

export type entityUpdateProperties =
  | CompanyUpdateProperties
  | EmployeeUpdateProperties;

export type RouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<Response>;
