import express from 'express';
import {
  getFormData,
  savePersonalInfo,
  saveEducationalStatus,
  saveProjects,
  completeForm,
} from '../controllers/formController.js';
import {
  validatePersonalInfo,
  validateEducationalStatus,
  validateProjects,
} from '../middleware/validation.js';

const router = express.Router();

// Get all form data
router.get('/form', getFormData);

// Save form sections
router.post('/form/personalInfo', validatePersonalInfo, savePersonalInfo);
router.post('/form/educationalStatus', validateEducationalStatus, saveEducationalStatus);
router.post('/form/projects', validateProjects, saveProjects);

// Complete form submission
router.post('/form/complete', completeForm);

export default router;