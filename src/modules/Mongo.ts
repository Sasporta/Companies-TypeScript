import BaseModule from './Base';
import { Model } from '../types/global';

type GetOneFn = (uuid: string) => Promise<Model | Error>;

export default class Mongo extends BaseModule {
  model: Model;

  constructor(model: Model) {
    super();
    this.model = model;
  }

  getOne: GetOneFn = async uuid =>
    (await this.model.findOne({ _id: uuid })) ?? this.throwError(404);

  // will be dealt with in next pr:

  // static edit = updateOrThrow404(Employee);

  // static destroy = deleteOrThrow404(Employee);
}
