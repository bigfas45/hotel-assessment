import express, { Request, Response } from 'express';
import {
  NotFoundError,
  BadRequestError,
  validateRequest,
} from '@hoteldev/common';
import { brandValidator } from '../validation/brandValidator';
import { BrandService } from '../services/addBrand';

const router = express.Router();

router.post(
  '/api/brand/',
  brandValidator.add,
  validateRequest,
  async (req: Request | any, res: Response | any) => {
    const { name } = req.body;

    const { status, data, message } = await BrandService.add({ name });

    if (status === 'failed') {
      throw new BadRequestError(message);
    }

    if (status === 'success') {
      return res
        .status(201)
        .json({ data, message: 'Brand added successfully' });
    }
  }
);

export { router as addBrandRouter };
