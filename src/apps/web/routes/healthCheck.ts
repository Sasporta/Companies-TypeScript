import express from 'express';

const router = express.Router();

router.get('/healthCheck', (req, res) => {
  return res.status(200).json({ status: 'healthy' });
});

export default router;
