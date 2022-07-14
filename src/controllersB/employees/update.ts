import { Request } from 'express';

import { Company } from '../../entities/Company';
import { Employee } from '../../entities/Employee';
import {
	findOrThrow,
	updateOrThrow404,
	validateAtLeastOneParamExists,
} from '../helpers';

export const updateEmployeeB = async ({
	params: { id: uuid },
	body: { companyUuid, managerUuid, name, age },
}: Request) => {
	validateAtLeastOneParamExists(name, age, companyUuid, managerUuid);

	const { id: company_id } =
		typeof companyUuid === 'string'
			? await findOrThrow(Company, companyUuid, 422)
			: { id: undefined };

	const { id: manager_id } =
		typeof managerUuid === 'string'
			? await findOrThrow(Employee, managerUuid, 422)
			: managerUuid === null
				? { id: null }
				: { id: undefined };

	const employee = await updateOrThrow404(Employee, {
		uuid,
		name,
		age,
		company_id,
		manager_id,
	});

	return {
		statusCode: 200,
		content: { uuid: employee.uuid, name: employee.name, age: employee.age },
	};
};
