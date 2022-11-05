import { query, check, body } from 'express-validator';

export const HotelValidator = {
  add: [
    body('name')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('Hotel name is required'),
    body('city')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('City is required'),
    body('country')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('country is required'),
    body('address')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('Address is required'),
    body('latitude')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('Latitude is required'),
    body('longitude')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('Longitude is required'),
    body('brand')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .isMongoId()
      .withMessage('Brand name is required'),
  ],

  update: [
    body('name').optional({ checkFalsy: true }).isString().trim(),
    body('city').optional({ checkFalsy: true }).isString().trim(),
    body('country').optional({ checkFalsy: true }).isString().trim(),
    body('address').optional({ checkFalsy: true }).isString().trim(),
    body('latitude').optional({ checkFalsy: true }).isFloat().trim(),
    body('longitude').optional({ checkFalsy: true }).isFloat().trim(),
    body('brand')
      .trim()
      .isMongoId()
      .optional({ checkFalsy: true })
      .withMessage('Brand name is required'),
    body('hotelId')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .isMongoId()
      .withMessage('Hotel Id is required'),
  ],

  get: [
    body('hotelId')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .isMongoId()
      .withMessage('Hotel Id is required'),
  ],
};

HotelValidator;
