import express, { Request, Response } from 'express';
import {
  NotFoundError,
  BadRequestError,
  validateRequest,
} from '@hoteldev/common';
import { brandValidator } from '../validation/brandValidator';
import { BrandService } from '../services/addBrand';

const router = express.Router();

router.get(
  '/api/brands/',

  async (req: Request | any, res: Response | any) => {
    const { status, data, message } = await BrandService.fetchBrands();

    if (status === 'failed') {
      throw new BadRequestError(message);
    }

    if (status === 'success') {
      return res.status(201).json({ data, message });
    }
  }
);

export { router as IndexrRouter };
