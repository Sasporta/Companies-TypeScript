import mongoose from 'mongoose';

import config from '../config';
import EmployeeMetadata from '../models/EmployeeMetadata';
import {
  EmployeeMetadataUpdateProperties,
  Model,
  ModelType,
} from '../types/global';

type GetAllFn = (
  whereStatement: { [key: string]: string },
  limit: number,
) => Promise<ModelType[] | []>;

type GetOneFn = (uuid: string) => Promise<ModelType | null>;

type EditFn = (
  uuid: string,
  params: EmployeeMetadataUpdateProperties,
) => Promise<ModelType | null>;

type IncrementFn = (
  uuid: string,
  count: { [key: string]: number },
) => Promise<ModelType | null>;

type SaveFn = (uuid: string, companyUuid: string) => Promise<ModelType>;

type DeleteFn = (uuid: string) => Promise<boolean>;

const {
  mongo: { mongoUrl },
} = config;

class Mongo {
  model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  static connect = async () => {
    try {
      await mongoose.connect(mongoUrl);

      console.log('MongoDB has been connected!');
    } catch (error) {
      console.error('Error during MongoDB connection ', error);
    }
  };

  getAll: GetAllFn = async (whereStatement, limit) =>
    await this.model.find(whereStatement).limit(limit);

  getOne: GetOneFn = async uuid => await this.model.findOne({ _id: uuid });

  edit: EditFn = async (uuid, ...params) =>
    await this.model.findByIdAndUpdate(uuid, ...params, {
      new: true,
    });

  increment: IncrementFn = async (uuid, count) =>
    await this.model.findByIdAndUpdate(uuid, { $inc: count });

  save: SaveFn = async (uuid, companyUuid) =>
    await this.model.create({ _id: uuid, companyUuid });

  destroy: DeleteFn = async uuid =>
    (await this.model.deleteOne({ _id: uuid })).deletedCount === 1;
}

export const EmployeeMetadataMongo = new Mongo(EmployeeMetadata);

export default Mongo;
