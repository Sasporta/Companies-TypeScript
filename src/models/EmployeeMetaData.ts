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
    companyUuid: {
      required: true,
      type: String,
      select: false,
    },
    employeeUuid: {
      required: true,
      type: String,
    },
    subordinatesCount: {
      required: true,
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      select: false,
    },
    updatedAt: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.model<EmployeeMetadataDocument>(
  'EmployeeMetadata',
  EmployeeMetadataSchema,
);
