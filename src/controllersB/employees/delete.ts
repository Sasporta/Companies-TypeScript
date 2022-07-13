import { Request } from 'express';

import { deleteOrThrow404 } from '../helpers';
import { Employee } from '../../entities/Employee';

export const deleteEmployeeB = async ({ params: { id: uuid } }: Request) => {
	await deleteOrThrow404(Employee, uuid);

	return { statusCode: 204 };
};
