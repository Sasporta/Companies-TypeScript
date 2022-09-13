import Mongo from './Mongo';
import EmployeeMetadata from '../models/EmployeeMetadata';

class EmployeeMetadataModule extends Mongo {
  constructor() {
    super(EmployeeMetadata);
  }
}

export default new EmployeeMetadataModule();
