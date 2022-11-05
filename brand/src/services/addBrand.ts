import mongoose from 'mongoose';
import { Brand } from '../models/brand';
import { natsWrapper } from '../nats-wrapper';
import { BrandCreatedPublisher } from '../events/publisher/brand-created-publisher';
import { BrandUpdatedPublisher } from '../events/publisher/brand-updated-publisher';
import { BrandDeletePublisher } from '../events/publisher/brand-deleted-publisher';

interface AddBrand {
  name: string;
}

interface UpdateBrand {
  name: string;
  brandId: mongoose.Types.ObjectId;
}

export class BrandService {
  static async add(details: AddBrand) {
    const { name } = details;

    const BrandExists = await this.fetchBrandByName(name);

    if (BrandExists) {
      return {
        status: 'failed',
        message: 'Brand name already exist, you can also edit an existing one',
      };
    }

    const brand = Brand.build({
      name,
    });

    await brand.save();

    new BrandCreatedPublisher(natsWrapper.client).publish({
      id: brand.id,
      name: brand.name,
      version: brand.version,
    });

    return {
      status: 'success',
      data: brand,
      message: 'Brand Created',
    };
  }

  static async fetchBrandByName(name: string) {
    const brand = await Brand.findOne({ name: name });

    return brand;
  }

  static async fetchBrandById(id: mongoose.Types.ObjectId) {
    const brand = await Brand.findById(id);

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

  static async fetchBrands() {
    const brand = await Brand.find({});

    return {
      status: 'success',
      data: brand,
      message: 'Brands fetched',
    };
  }

  static async update(details: UpdateBrand) {
    const { name, brandId } = details;

    const brand = await Brand.findById(brandId);

    if (!brand) {
      return {
        status: 'failed',
        message: 'Brand your are trying to exist does not exist',
      };
    }

    if (name) {
      brand.set({ name });
    }

    await brand.save();

    new BrandUpdatedPublisher(natsWrapper.client).publish({
      id: brand.id,
      name: brand.name,
      version: brand.version,
    });

    return {
      status: 'success',
      message: 'Brand Details updated successfully',
      data: brand,
    };
  }

  static async delete(id: mongoose.Types.ObjectId) {
    const brand = await Brand.findById(id);

    if (!brand) {
      return {
        status: 'failed',
        message: 'Brand Id does not exist',
      };
    }

    brand.remove();

    new BrandDeletePublisher(natsWrapper.client).publish({
      id: brand.id,
      name: brand.name,
      version: brand.version,
    });

    return {
      status: 'success',
      message: 'Brand Deleted successfully',
    };
  }
}
