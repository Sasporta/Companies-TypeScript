import { existingCompanies } from "./company";
import { existingEmployees } from "./employee";
import { Company } from "../../../entities/Company";
import { dataSource } from "../../../config/typeorm";
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

  dataSource.createQueryBuilder = jest.fn().mockReturnValue(mockCreateQueryBuilder);
};

export const mockFindOneBy = (uuid: string, list: { uuid: string }[]) =>
  list.reduce((a, c) => c.uuid === uuid ? { ...c, remove: jest.fn(), save: jest.fn() } : a, null);

const queryData = {
  isDelete: undefined,
  selectedColumns: undefined,
  collection: undefined,
  updateData: undefined,
  conditions: undefined,
  limit: undefined,
};

const sliceAfter = (text: string, slicePoint: string) => text.slice(text.indexOf(slicePoint) + 1);

const chooseTable = jest.fn().mockImplementation((model: any) => {
  switch (model) {
    case Company:
      queryData.collection = existingCompanies;
      break;
    case Employee:
      queryData.collection = existingEmployees;
      break;
  }

  return mockCreateQueryBuilder;
});

const getConditions = jest.fn().mockImplementation((stringCondition: string, uuidObj: object) => {
  const uuidType = sliceAfter(stringCondition, ':');

  queryData.conditions = { [uuidType]: uuidObj[uuidType] };

  return mockCreateQueryBuilder;
})

const mockCreateQueryBuilder: any = {
  delete: jest.fn().mockImplementation(() => {
    queryData.isDelete = true;

    return mockCreateQueryBuilder;
  }),

  select: jest.fn().mockImplementation((traits: string[]) => {
    queryData.selectedColumns = traits.map(t => sliceAfter(t, '.'));

    return mockCreateQueryBuilder;
  }),

  from: chooseTable,

  update: chooseTable,

  set: jest.fn().mockImplementation(({ ...params }: { params: any[] }) => {
    queryData.updateData = { ...params };

    return mockCreateQueryBuilder;
  }),

  innerJoin: jest.fn().mockImplementation(() => mockCreateQueryBuilder),

  where: getConditions,

  andWhere: getConditions,

  returning: jest.fn().mockImplementation(() => mockCreateQueryBuilder),

  limit: jest.fn().mockImplementation((limit: number) => {
    queryData.limit = limit || 10;

    return mockCreateQueryBuilder;
  }),

  getMany: jest.fn().mockImplementation(() => {
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

    return newCollection
      .reduce((a, r, i) => i < limit ?
        [ ...a, Object.fromEntries(
          Object.entries(r).filter(entry => selectedColumns.includes(entry[0]))
        )] : a
      , [])
  }),


  execute: jest.fn().mockImplementation(() => {
    const { collection, conditions: { uuid }, isDelete, updateData } = queryData;

    const item = collection.reduce((a, r) => {
      if(r.uuid === uuid) {
        Object.keys(updateData).forEach(key => { if(updateData[key] !== undefined) r[key] = updateData[key] })

        a = r;
      }

      return a;
    }, null);

    const affected = item ? 1 : 0;

    return isDelete ? { affected } : { affected, raw: [item] };
    }),
};