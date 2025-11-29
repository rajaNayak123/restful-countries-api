import http from 'http';
import { logger } from './middleware/logger.js';
import { router } from './routes/router.js';

const PORT = process.env.PORT || 8000;

const server = http.createServer(async (req, res) => {
  // 1. Logging Middleware
  logger(req, res);
  
  // 2. Run Router
  await router(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});