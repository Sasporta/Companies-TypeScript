import mongoose from 'mongoose';

export interface EmployeeMetadataDocument extends mongoose.Document {
  companyUuid: string;
  employeeUuid: string;
  subordinatesCount: number;
  createdAt: Date;
  updatedAt: Date;
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
