import ErrorHandling from './ErrorHandling';
import EmployeeMetaData from '../models/EmployeeMetaData';
import { getEmployeeMetadata } from '../controllers/employeesMetadata/getOne';
import { getEmployeesMetadata } from '../controllers/employeesMetadata/getAll';

export default class EmployeeMetadataModule {
  static endPoints = [getEmployeeMetadata, getEmployeesMetadata];

  static employeesMetadataEps = () =>
    EmployeeMetadataModule.endPoints.map(ep =>
      ErrorHandling.controllerWrapper(ep),
    );

  static getOne = async (uuid: string) =>
    ErrorHandling.hitMongoOrThrow(
      await EmployeeMetaData.findOne({ employeeUuid: uuid }),
    );

  // will be dealt with in next pr:

  // static edit = ErrorHandling.updateOrThrow404(Employee);

  // static destroy = ErrorHandling.deleteOrThrow404(Employee);
}
