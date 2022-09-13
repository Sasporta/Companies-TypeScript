import ErrorHandling from './ErrorHandling';
import EmployeeMetaData from '../models/EmployeeMetaData';

export default class EmployeeMetadataModule {
  static getOne = async (uuid: string) =>
    ErrorHandling.hitMongoOrThrow(
      await EmployeeMetaData.findOne({ employeeUuid: uuid }),
    );

  // will be dealt with in next pr:

  // static edit = ErrorHandling.updateOrThrow404(Employee);

  // static destroy = ErrorHandling.deleteOrThrow404(Employee);
}
