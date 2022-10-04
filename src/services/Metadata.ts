import { EmployeeMetadataMongo } from './Mongo';

type UpdateCompanyUuidFn = (
  employeeUuid: string,
  companyUuid: string,
) => Promise<void> | undefined;

type UpdateManagerFn = (
  employeeUuid: string,
  countChange: number,
) => Promise<void> | undefined;

type UpdateCountsFnParams = {
  companyUuid: string | undefined;
  employeeUuid: string | undefined;
  futureManagerUuid: string | undefined;
  previousManagerUuid: string | undefined;
};

type UpdateCountsFn = (params: UpdateCountsFnParams) => Promise<void>;

type CreateCountFnParams = {
  companyUuid: string | undefined;
  employeeUuid: string | undefined;
  futureManagerUuid: string | undefined;
};
type CreateCountFn = (params: CreateCountFnParams) => Promise<void>;

type DeleteCountFnParams = {
  employeeUuid: string;
  previousManagerUuid: string | undefined;
};

type DeleteCountFn = (params: DeleteCountFnParams) => Promise<void>;

class Metadata {
  private updateCompanyUuid: UpdateCompanyUuidFn = async (
    employeeUuid,
    companyUuid,
  ) => {
    companyUuid &&
      (await EmployeeMetadataMongo.edit(employeeUuid, { companyUuid }));
  };

  private updateManager: UpdateManagerFn = async (managerUuid, countChange) => {
    managerUuid &&
      (await EmployeeMetadataMongo.increment(managerUuid, {
        subordinatesCount: countChange,
      }));
  };

  updateCounts: UpdateCountsFn = async ({
    companyUuid,
    employeeUuid,
    futureManagerUuid,
    previousManagerUuid,
  }) => {
    await Promise.all([
      this.updateManager(futureManagerUuid, 1),
      this.updateManager(previousManagerUuid, -1),
      this.updateCompanyUuid(employeeUuid, companyUuid),
    ]);
  };

  createCount: CreateCountFn = async ({
    employeeUuid,
    companyUuid,
    futureManagerUuid,
  }) => {
    await Promise.all([
      this.updateManager(futureManagerUuid, 1),
      EmployeeMetadataMongo.save(employeeUuid, companyUuid),
    ]);
  };

  deleteCount: DeleteCountFn = async ({
    employeeUuid,
    previousManagerUuid,
  }) => {
    await Promise.all([
      this.updateManager(previousManagerUuid, -1),
      EmployeeMetadataMongo.destroy(employeeUuid),
    ]);
  };
}

export default new Metadata();
