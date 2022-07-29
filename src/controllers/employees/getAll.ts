import { Request } from 'express';

import Validation from '../../models/Validation';
import EmployeeModel from '../../models/Employee';
import { Employee } from '../../entities/Employee';
import { getAllEmployeesQuery } from '../../pgQueries/employees/getAll';

export const getEmployees = async ({
	query: { companyUuid, managerUuid, limit },
}: Request) => {
	companyUuid = companyUuid as string;
	managerUuid = managerUuid as string;

	let employees: Employee[];

	const resultsLimit = Validation.limit(+limit);

	const stringifyParams = EmployeeModel.stringifyParams({
		companyUuid,
		managerUuid,
		limit: resultsLimit,
	});

	employees = await EmployeeModel.getListFromCache(stringifyParams);

	if (!employees) {
		employees = await getAllEmployeesQuery(
			companyUuid,
			managerUuid,
			resultsLimit,
		);

		await EmployeeModel.setListInCache(stringifyParams, employees);
	}

	return { statusCode: 200, content: employees };
};
