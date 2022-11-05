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
  '/api/brand/',
  brandValidator.getBrand,
  validateRequest,
  async (req: Request | any, res: Response | any) => {
    const { brandId } = req.body;

    const { status, data, message } = await BrandService.fetchBrandById(
      brandId
    );

    if (status === 'failed') {
      throw new BadRequestError(message);
    }

    if (status === 'success') {
      return res.status(201).json({ data, message });
    }
  }
);

export { router as fetchBrandByIdRouter };
