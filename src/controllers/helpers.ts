import { Request, Response } from 'express';
import { dataSource } from '../config/typeorm';

import resDoc from '../swagger/docs/components/responses';

export const getLimit = (limit: number) =>
	limit >= 1 && limit <= 10 ? limit : 10;

export const throwError = (status: number) => {
	throw { status, message: resDoc.responses[status] };
};

export const validateAllParamsExists = (...params: string[]) => {
	if (params.some(p => p === undefined)) throwError(422);
};

export const validateAtLeastOneParamExists = (...params: string[]) => {
	if (params.every(p => p === undefined)) throwError(422);
};

export const findOrThrow = async (
	model: any,
	uuid: string,
	statusCode: number,
) => (await model.findOneBy({ uuid })) ?? throwError(statusCode);

export const deleteOrThrow404 = async (table: any, uuid: string) => {
	if (
		(
			await dataSource
				.createQueryBuilder()
				.delete()
				.from(table)
				.where('uuid = :uuid', { uuid })
				.execute()
		).affected === 0
	)
		throwError(404);
};

export const updateOrThrow404 = async (
	table: any,
	{ uuid, ...params }: any,
) => {
	const {
		raw: [entity],
		affected,
	} = await dataSource
		.createQueryBuilder()
		.update(table)
		.set({ ...params })
		.where('uuid = :uuid', { uuid })
		.returning('*')
		.execute();

	return affected === 0 ? throwError(404) : entity;
};

export const controllerWrapper =
	(
		crudMethod: (
			req: Request,
		) => Promise<{ statusCode: number; content?: object | object[] }>,
	) =>
		async (req: Request, res: Response) => {
			try {
				const { statusCode, content } = await crudMethod(req);

				return res.status(statusCode).json(content);
			} catch (error) {
				return res.status(error.status ?? 500).json(error.message);
			}
		};
