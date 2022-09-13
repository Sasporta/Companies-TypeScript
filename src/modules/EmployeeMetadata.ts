import Mongo from './Mongo';
import EmployeeMetaData from '../models/EmployeeMetaData';

class EmployeeMetadataModule extends Mongo {
  constructor() {
    super(EmployeeMetaData);
  }
}

export default new EmployeeMetadataModule();
