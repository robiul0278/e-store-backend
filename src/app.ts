import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import router from './app/routes';
import cookieParser  from "cookie-parser";


// parsers
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors());

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send(`OK! Mongoose is running at ${new Date().toLocaleTimeString()}!`);
});

// Catch-all route for unsupported methods
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Can't find this ${req.originalUrl} on the server!`);
  (error as any).statusCode = 405;
  next(error); // Pass global error handler
});


// Global error handling middleware
app.use(globalErrorHandler)

export default app;
