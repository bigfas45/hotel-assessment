import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@hoteldev/common';
import { IndexrRouter } from './routes/index';




import cookieSession from 'cookie-session';
const app = express();


app.set('trust proxy', true);
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);



app.use(IndexrRouter)





app.all('*', async (req: any, res: any, next: any) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
