import express, { Request, Response } from 'express';
import {
  NotFoundError,
  BadRequestError,
  validateRequest,
} from '@hoteldev/common';
import { Hotels } from '../models/hotel';
import { HotelValidator } from '../validation';
import { HotelService } from '../services';

const router = express.Router();

router.post(
  '/api/hotel/',
  HotelValidator.add,
  validateRequest,
  async (req: Request | any, res: Response | any) => {
    const { name, address, longitude, latitude, country, city, brand } =
      req.body;

    const { status, data, message } = await HotelService.add({
      name,
      address,
      longitude,
      latitude,
      country,
      city,
      brand,
    });

    if (status === 'failed') {
      throw new BadRequestError(message);
    }

    if (status === 'success') {
      return res.status(201).json({ data, message });
    }
  }
);

router.put(
  '/api/hotel/',
  HotelValidator.update,
  validateRequest,
  async (req: Request | any, res: Response | any) => {
    const {
      name,
      address,
      longitude,
      latitude,
      country,
      city,
      brand,
      hotelId,
    } = req.body;

    const { status, data, message } = await HotelService.update({
      name,
      address,
      longitude,
      latitude,
      country,
      city,
      brand,
      hotelId,
    });

    if (status === 'failed') {
      throw new BadRequestError(message);
    }

    if (status === 'success') {
      return res.status(201).json({ data, message });
    }
  }
);

router.get(
  '/api/hotel/',
  HotelValidator.get,
  validateRequest,
  async (req: Request | any, res: Response | any) => {
    const { hotelId } = req.body;

  

    const { status, data, message } = await HotelService.fetchById(hotelId);

    if (status === 'failed') {
      throw new BadRequestError(message);
    }

    if (status === 'success') {
      return res.status(201).json({ data, message });
    }else{
      
        throw new BadRequestError("Something went wrong");
      
    }
  }
);

router.get(
  '/api/hotels',

  async (req: Request | any, res: Response | any) => {
    let brands: any = [];

    brands = req.query.brand;

    const { status, message, data } = await HotelService.fetchByMultipleBrand(
      brands
    );

    if (status === 'success') {
      return res.status(201).json({ data, message });
    }
  }
);

router.get(
  '/api/hotels/group',

  async (req: Request | any, res: Response | any) => {

    const {status, data, message} = await HotelService.fetchBrandByGroup()

    
    if (status === 'success') {
      return res.status(201).json({ data, message });
    }else{
      throw new BadRequestError("Something went wrong");
    }
   
  }
);

router.delete(
  '/api/hotel/',
  HotelValidator.get,
  validateRequest,
  async (req: Request | any, res: Response | any) => {

      }
);

export { router as IndexrRouter };
