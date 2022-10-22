import express from 'express';

import routes from '../routes';
import { logErrors } from './logErrors';
import { corsEnabler } from './corsEnabler';
import { errorHandler } from './errorHandler';

export default [express.json(), corsEnabler, routes, logErrors, errorHandler];
