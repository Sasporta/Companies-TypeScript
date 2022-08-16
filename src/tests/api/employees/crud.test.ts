import { postRequestTest } from './post';
import { getAllRequestTest } from './getAll';
import { getOneRequestTest } from './getOne';
import { updateRequestTest } from './update';
import { deleteRequestTest } from './delete';
import { redis } from '../../../config/redis';
import { dataSource } from '../../../config/typeorm';
import { getAllCousinsRequestTest } from './getAllCousins';

describe('employees CRUD requests', () => {
	beforeAll(async () => await dataSource.initialize());
	afterAll(async () => {
		await redis.disconnect();
		await dataSource.destroy();
	});

	getAllCousinsRequestTest();
	getAllRequestTest();
	getOneRequestTest();
	updateRequestTest();
	deleteRequestTest();
	postRequestTest();
});
