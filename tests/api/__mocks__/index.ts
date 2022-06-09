import { existingCompanies } from "./company";
import { existingEmployees } from "./employee";
import { Company } from "../../../entities/Company";
import { Employee } from "../../../entities/Employee";

export const mockAllBasics = () => {
  jest.mock('typeorm', () => ({
    __esModule: true,
    Column: jest.fn(),
    Entity: jest.fn(),
    ManyToOne: jest.fn(),
    OneToMany: jest.fn(),
    JoinColumn: jest.fn(),
    BaseEntity: jest.fn(),
    CreateDateColumn: jest.fn(),
    UpdateDateColumn: jest.fn(),
    PrimaryGeneratedColumn: jest.fn(),
  }));
};

export const mockFindOneBy = (uuid: string, list: { uuid: string }[]) =>
  list.reduce((a, c) => c.uuid === uuid ? { ...c, remove: jest.fn(), save: jest.fn() } : a, null);

const query = {
  delete: undefined,
  update: undefined,
  set: undefined,
  from: undefined,
  innerJoin: undefined,
  select: undefined,
  where: undefined,
  andWhere: undefined,
  limit: undefined,
  getMany: undefined,
  returning: undefined,
  execute: undefined,
};

const createQueryBuilder: any = {
  delete: jest.fn(),

  update: jest.fn(),

  set: jest.fn(),

  from: jest.fn().mockImplementation((model: any) => {
    query.from = model;

    return createQueryBuilder;
  }),

  innerJoin: jest.fn(),

  select: jest.fn().mockImplementation((traits: string[]) => {
    query.select = traits.map(t => t.slice(t.indexOf('.') + 1));

    return createQueryBuilder;
  }),

  // where: jest.fn().mockImplementation((condition: string, param: any) => {
  //   query.where = traits;

  //   return createQueryBuilder;
  // }),

  andWhere: jest.fn(),

  limit: jest.fn().mockImplementation((limit: number) => {
    query.limit = limit;

    return createQueryBuilder;
  }),
  getMany: jest.fn().mockImplementation(() => {
    let table: object[];
    if (query.from === Company) table = existingCompanies;
    else if (query.from === Employee) table = existingEmployees;



    return table.map(e => ({ e[query.select[1]],   }));
  }),

  returning: jest.fn(),

  execute: jest.fn(),
};

// await dataSource.createQueryBuilder().delete().from(table).where('uuid = :uuid', { uuid }).execute()

const companies = await dataSource
  .createQueryBuilder()
  .from(Company, 'company')
  .select(['company.uuid', 'company.name', 'company.country'])
  .limit(getLimit(+limit))
  .getMany();
