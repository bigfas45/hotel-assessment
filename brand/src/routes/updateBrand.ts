import express, { Request, Response } from 'express';
import {
  NotFoundError,
  BadRequestError,
  validateRequest,
} from '@hoteldev/common';
import { brandValidator } from '../validation/brandValidator';
import { BrandService } from '../services/addBrand';

const router = express.Router();

router.put(
  '/api/brand/',
  brandValidator.updateBrand,
  validateRequest,
  async (req: Request | any, res: Response | any) => {
    const { name, brandId } = req.body;

    const { status, data, message } = await BrandService.update({
      name,
      brandId,
    });

    if (status === 'failed') {
      throw new BadRequestError(message);
    }

    if (status === 'success') {
      return res.status(201).json({ data, message });
    }
  }
);

export { router as UpdateBrandRouter };
