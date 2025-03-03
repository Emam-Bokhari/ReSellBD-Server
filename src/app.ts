import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
const app = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

// check server health
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running...');
});

// global error handler
app.use(globalErrorHandler);

// not found handler
app.use(notFound);

export default app;
