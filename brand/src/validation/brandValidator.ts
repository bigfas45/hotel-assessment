import { query, check, body}  from 'express-validator';

export const brandValidator = {
    
    add: [
        body('name')
            .not()
            .isEmpty({ ignore_whitespace: true })
            .trim()
            .withMessage('Brand name is required'),
   
       
    ], 

    getBrand: [
        body('brandId')
        .not()
        .isEmpty({ ignore_whitespace: true })
        .trim()
        .isMongoId()
        .withMessage('Brand name is required')
    ],

    updateBrand: [
        body('brandId')
        .not()
        .isEmpty({ ignore_whitespace: true })
        .trim()
        .isMongoId()
        .withMessage('Brand name is required'),
        body('name')
        .not()
        .isEmpty({ ignore_whitespace: true })
        .trim()
        .withMessage('Brand name is required'),
    ]
};

brandValidator;
