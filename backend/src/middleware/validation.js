import { body, validationResult } from 'express-validator';

// Helper for validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Personal Info validation
export const validatePersonalInfo = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email'),
  
  body('addressLine1')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
  
  body('city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  
  body('state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  
  body('zipcode')
    .trim()
    .notEmpty()
    .withMessage('Zipcode is required')
    .matches(/^\d{5}(-\d{4})?$/)
    .withMessage('Please enter a valid US zipcode (e.g., 12345 or 12345-6789)'),
  
  handleValidationErrors,
];

// Educational Status validation
export const validateEducationalStatus = [
  body('isStudying')
    .isBoolean()
    .withMessage('Is studying must be a boolean'),
  
  body('studyingAt')
    .if(body('isStudying').equals('true'))
    .trim()
    .notEmpty()
    .withMessage('Please specify where you are studying'),
  
  handleValidationErrors,
];

// Projects validation
export const validateProjects = [
  body()
    .isArray()
    .withMessage('Projects must be an array'),
  
  body('*.name')
    .trim()
    .notEmpty()
    .withMessage('Project name is required')
    .isLength({ max: 100 })
    .withMessage('Project name must be less than 100 characters'),
  
  body('*.description')
    .trim()
    .notEmpty()
    .withMessage('Project description is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  
  handleValidationErrors,
];