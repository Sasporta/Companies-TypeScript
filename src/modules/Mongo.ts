import BaseModule from './Base';
import {
  EmployeeMetadataUpdateProperties,
  Model,
  ModelType,
} from '../types/global';

type GetOneFn = (uuid: string) => Promise<ModelType | Error>;

type EditFn = (
  uuid: string,
  params: EmployeeMetadataUpdateProperties,
) => Promise<ModelType | Error>;

type IncrementFn = (
  uuid: string,
  count: { [key: string]: number },
) => Promise<ModelType | Error>;

export default class Mongo extends BaseModule {
  model: Model;

  constructor(model: Model) {
    super();
    this.model = model;
  }

  getOne: GetOneFn = async uuid =>
    (await this.model.findOne({ _id: uuid })) ?? this.throwError(404);

  edit: EditFn = async (uuid, ...params) =>
    (await this.model.findByIdAndUpdate(uuid, ...params, {
      new: true,
    })) ?? this.throwError(404);

  increment: IncrementFn = async (uuid, count) =>
    (await this.model.findByIdAndUpdate(uuid, { $inc: count })) ??
    this.throwError(404);

  // destroy = async uuid =>
  //   (await this.model.findOne({ _id: uuid })) ?? this.throwError(404);
}
