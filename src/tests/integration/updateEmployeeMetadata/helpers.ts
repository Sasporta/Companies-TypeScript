import request from 'supertest';

export const {
  get,
  post,
  patch,
  delete: destroy,
} = request('http://localhost:8000');
