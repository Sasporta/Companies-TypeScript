import schemas from './schemas';
import parameters from './parameters';
import responses from './responses';

export default {
	components: {
		...schemas,
		...parameters,
		...responses,
	},
};
