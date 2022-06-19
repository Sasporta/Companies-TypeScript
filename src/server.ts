import app from './app';
import config from './config';
import { dataSource } from './config/typeorm';

const {
	env: { port },
} = config;

app.listen(port, async () => {
	try {
		await dataSource.initialize();
		console.log('Data Source has been initialized!');
	} catch (error) {
		console.error('Error during Data Source initialization ', error);
	}
	console.log('App running on port ', port);
});
