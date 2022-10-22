import { body, oneOf, param, query } from 'express-validator';

const uuid = param('id').isUUID();

const name = body('name').exists().isString();

const title = body('title').exists().isString();

const country = body('country').exists().isString();

const companyUuidInBody = body('companyUuid').exists().isUUID();

const managerUuidInBody = body('managerUuid').exists().isUUID();

const limit = query('limit').default(10).isInt({ min: 1, max: 100 });

const companyUuidInQuery = query('companyUuid')
  .if(param('companyUuid').exists())
  .isUUID();

const managerUuidInBodyIsNull = body('managerUuid')
  .exists()
  .custom(v => v === null);

const managerUuidInQuery = oneOf([
  query('managerUuid').if(param('managerUuid').exists()).isUUID(),
  query('managerUuid')
    .if(param('managerUuid').exists())
    .custom(v => v === null),
]);

export const companiesVal = {
  delete: uuid,
  getOne: uuid,
  getAll: limit,
  post: [name, country],
  patch: [uuid, oneOf([name, country])],
};

export const employeesVal = {
  delete: uuid,
  getOne: uuid,
  getAll: [limit, companyUuidInQuery, managerUuidInQuery],
  getCousins: [uuid, limit],
  post: [
    name,
    title,
    companyUuidInBody,
    oneOf([managerUuidInBody, managerUuidInBodyIsNull]),
  ],
  patch: [
    uuid,
    oneOf([
      name,
      title,
      companyUuidInBody,
      managerUuidInBody,
      managerUuidInBodyIsNull,
    ]),
  ],
};

export const employeeMetadataVal = {
  getOne: uuid,
  getAll: [limit, companyUuidInQuery],
};
