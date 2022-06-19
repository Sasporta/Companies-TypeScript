import fs from 'fs';

export const existingCompanies = fs
	.readFileSync('./src/seeds/seed_companies.sql')
	.toString()
	.split('VALUES\n')[1]
	.split('\n')
	.slice(0, -1)
	.reduce((a, c, i) => {
		const data = c
			.slice(c.indexOf('(') + 1, c.indexOf(')'))
			.replaceAll(/[\s']/g, '')
			.split(',');

		return [
			...a,
			{
				id: i + 1,
				uuid: data[0],
				name: data[1],
				country: data[2],
				updated_at: new Date().toISOString(),
				created_at: new Date().toISOString(),
			},
		];
	}, []);

export const companiesPath = '/companies';

export const postedCompany = {
	name: 'PostedCompany',
	country: 'PostedCountry',
};

export const updatedCompany = {
	country: 'UpdatedCountry',
};
