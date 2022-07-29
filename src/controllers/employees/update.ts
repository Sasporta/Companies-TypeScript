import { Request } from 'express';

import CompanyModel from '../../models/Company';
import Validation from '../../models/Validation';
import EmployeeModel from '../../models/Employee';

export const updateEmployee = async ({
	params: { id: uuid },
	body: { companyUuid, managerUuid, name, age },
}: Request) => {
	Validation.atLeastOneParamExists(name, age, companyUuid, managerUuid);

	const { id: company_id } =
		typeof companyUuid === 'string'
			? await CompanyModel.getOne(companyUuid, 422)
			: { id: undefined };

	const { id: manager_id } =
		typeof managerUuid === 'string'
			? await EmployeeModel.getOne(managerUuid, 422)
			: managerUuid === null
				? { id: null }
				: { id: undefined };

	const employee = await EmployeeModel.edit({
		uuid,
		name,
		age,
		company_id,
		manager_id,
	});

	await Promise.all([
		EmployeeModel.removeItemFromCache(uuid),
		EmployeeModel.removeAllListsFromCache(),
	]);

	return {
		statusCode: 200,
		content: { uuid: employee.uuid, name: employee.name, age: employee.age },
	};
};
