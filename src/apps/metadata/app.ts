import express from 'express';

const app = express();

app.get('/healthCheck', (req, res) => {
  return res.status(200).json({ status: 'healthy' });
});

export default app;
