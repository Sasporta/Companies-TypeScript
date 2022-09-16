import mongoose from 'mongoose';

export interface EmployeeMetadataDocument extends mongoose.Document {
  _id: string;
  companyUuid: string;
  subordinatesCount: number;
}

const EmployeeMetadataSchema = new mongoose.Schema(
  {
    _id: {
      required: true,
      type: 'object',
      value: { type: 'Buffer' },
    },
    companyUuid: {
      required: true,
      type: 'object',
      value: { type: 'Buffer' },
      select: false,
    },
    subordinatesCount: {
      required: true,
      type: Number,
      default: 0,
    },
  },
  { versionKey: false },
);

export default mongoose.model<EmployeeMetadataDocument>(
  'employee_metadata',
  EmployeeMetadataSchema,
);
