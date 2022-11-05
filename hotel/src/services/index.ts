import mongoose from 'mongoose';
import { Brand } from '../models/brand';
import { Hotels } from '../models/hotel';

import { natsWrapper } from '../nats-wrapper';

interface AddHotel {
  name: string;
  city: string;
  country: string;
  address: string;
  brand: mongoose.Types.ObjectId;
  longitude: number;
  latitude: number;
}

interface UpdateHotel {
  name?: string;
  city?: string;
  country?: string;
  address?: string;
  brand?: mongoose.Types.ObjectId;
  longitude?: number;
  latitude?: number;
  hotelId: mongoose.Types.ObjectId;
}
interface FetchHotel {
  hotelId: mongoose.Types.ObjectId;
}

export class HotelService {
  static async add(details: AddHotel) {
    const { name, city, country, address, brand, longitude, latitude } =
      details;

    const { status } = await this.isbrandId(brand);

    if (status === 'failed') {
      return {
        status: 'failed',
        message: 'Brand Id does not exist',
      };
    }

    const hotel = Hotels.build({
      name,
      city,
      country,
      address,
      brand,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    });

    await hotel.save();

    return {
      status: 'success',
      data: hotel,
      message: 'Hotel Created',
    };
  }

  static async isbrandId(brandId: mongoose.Types.ObjectId) {
    const brand = await Brand.findById(brandId);

    if (!brand) {
      return {
        status: 'failed',
        data: brand,
        message: 'Brand Id does not exist',
      };
    }

    return {
      status: 'success',
      data: brand,
      message: 'Brand exist',
    };
  }

  static async update(details: UpdateHotel) {
    const {
      name,
      city,
      country,
      address,
      brand,
      longitude,
      latitude,
      hotelId,
    } = details;

    const hotel = await Hotels.findById(hotelId);

    if (!hotel) {
      return {
        status: 'failed',
        message: 'Hotel Id does not exist!!!',
      };
    }

    if (name) {
      hotel.set({ name });
    }
    if (city) {
      hotel.set({ city });
    }
    if (country) {
      hotel.set({ country });
    }

    if (address) {
      hotel.set({ address });
    }

    if (brand) {
      hotel.set({ brand });
    }

    if (longitude && latitude) {
      hotel.set({
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      });
    }

    await hotel.save();

    return {
      status: 'success',
      data: hotel,
      message: 'Hotel details updated successfully',
    };
  }

  static async fetchById(hotelId: mongoose.Types.ObjectId) {
    const hotel = await Hotels.findById(hotelId);

    if (!hotel) {
      return {
        status: 'success',
        message: 'Hotel Id does not exist',
      };
    }

    return {
      status: 'success',
      data: hotel,
      message: 'Hotel Details',
    };
  }

  static async fetchByMultipleBrand(brands: any) {
    const filterOption: any = {};

    if (typeof brands === 'object') {
      filterOption.$or = [];
      for (let brand of brands) {
        filterOption.$or.push({ brand });
      }
    } else if (typeof brands === 'string') {
      console.log('QQQQQQQQQQQQQ', brands);
      filterOption.brand = brands;
    }

    const hotels = await Hotels.find(filterOption);

    return {
      status: 'success',
      data: hotels,
      message: 'Multiple data ',
    };
  }

  static async fetchBrandByGroup() {
    const hotels = await Hotels.aggregate([
      {
        $lookup: {
          from: 'brands',
          localField: 'brand',
          foreignField: '_id',
          as: 'brand',
        },
      },
      { $unwind: '$brand' },
      {
        $group: {
          _id: '$brand.name',
          hotels: {
            $push: '$$ROOT',
          },
        },
      },
    ]);

    return {
      status: 'success',
      data: hotels,
      message: 'Hotel data by brand group',
    };

  }
}
