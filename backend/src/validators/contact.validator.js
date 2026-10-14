import { body } from 'express-validator';

export const contactValidationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .escape()
    .isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters long'),

  body('email')
    .trim()
    .escape()
    .isEmail().withMessage('Valid email is required')
    .notEmpty().withMessage('Email is required')
    .toLowerCase(),

  body('phoneNo')
    .trim()
    .isMobilePhone('en-IN').withMessage('Phone number must be a valid mobile number')
    .escape(),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 5, max: 500 }).withMessage('Message must be between 5 and 500 characters long')
]