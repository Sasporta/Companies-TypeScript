import { Request } from 'express';
import { In } from 'typeorm';

import { findOrThrow, getLimit, throwError } from '../helpers';
import { Employee } from '../../entities/Employee';

export const getCousinsB = async ({
	params: { id: uuid },
	query: { limit },
}: Request) => {
	const child = await findOrThrow(Employee, uuid, 404);

	const parent =
		(await Employee.findOneBy({ id: child.manager_id })) ?? throwError(404);

	const grandparent =
		(await Employee.findOneBy({ id: parent.manager_id })) ?? throwError(404);

	const allParents = await Employee.find({
		where: {
			manager_id: grandparent.id,
		},
	});

	const unclesId = allParents.reduce(
		(a, c) => (c.id !== parent.id ? [...a, c.id] : a),
		[],
	);

	const cousins = await Employee.find({
		where: {
			manager_id: In([...unclesId]),
		},
		take: getLimit(+limit),
	});

	return { statusCode: 200, content: cousins };
};
