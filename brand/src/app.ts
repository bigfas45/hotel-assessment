import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@hoteldev/common';
import { IndexrRouter } from './routes/fetchBrands';
import { addBrandRouter } from './routes/addBrand';
import { fetchBrandByIdRouter } from './routes/fetchBrandById';
import { UpdateBrandRouter } from './routes/updateBrand';
import { deleteBrandRouter } from './routes/deleteBrand';




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
app.use(addBrandRouter)
app.use(fetchBrandByIdRouter)
app.use(UpdateBrandRouter)
app.use(deleteBrandRouter)





app.all('*', async (req: any, res: any, next: any) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
