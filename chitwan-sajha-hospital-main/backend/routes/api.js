import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validator.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

import * as authController from '../controllers/authController.js';
import * as doctorController from '../controllers/doctorController.js';
import * as departmentController from '../controllers/departmentController.js';
import * as appointmentController from '../controllers/appointmentController.js';
import * as reportController from '../controllers/reportController.js';
import * as packageController from '../controllers/packageController.js';
import * as contentController from '../controllers/contentController.js';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    hospital: 'CHITWAN SAJHA HOSPITAL',
    timestamp: new Date().toISOString()
  });
});

// --- ADMIN AUTHENTICATION ONLY ---
router.post('/auth/admin/login',
  authLimiter,
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validateRequest,
  authController.login
);

// --- DOCTORS ---
router.get('/doctors', doctorController.getDoctors);
router.get('/doctors/:slug', doctorController.getDoctorBySlug);
router.post('/doctors', authenticate, authorize('admin'), doctorController.createDoctor);
router.put('/doctors/:id', authenticate, authorize('admin'), doctorController.updateDoctor);
router.delete('/doctors/:id', authenticate, authorize('admin'), doctorController.deleteDoctor);

// --- DEPARTMENTS ---
router.get('/departments', departmentController.getDepartments);
router.get('/departments/:slug', departmentController.getDepartmentBySlug);
router.post('/departments', authenticate, authorize('admin'), departmentController.createDepartment);

// --- APPOINTMENTS (PUBLIC OPD BOOKING) ---
router.post('/appointments',
  [
    body('patient_name').notEmpty().withMessage('Patient name is required'),
    body('patient_phone').notEmpty().withMessage('Phone number is required'),
    body('department_id').notEmpty().withMessage('Department is required'),
    body('appointment_date').notEmpty().withMessage('Appointment date is required')
  ],
  validateRequest,
  appointmentController.bookAppointment
);
router.get('/appointments/number/:aptNumber', appointmentController.getAppointmentByNumber);
router.get('/appointments/:aptNumber/pdf', appointmentController.downloadAppointmentPdf);
router.get('/appointments', authenticate, authorize('admin'), appointmentController.getAllAppointments);
router.put('/appointments/:id/status', authenticate, authorize('admin'), appointmentController.updateAppointmentStatus);

// --- DIAGNOSTIC LAB REPORTS ---
router.get('/reports/search', reportController.getLabReports);
router.get('/reports/:reportCode/pdf', reportController.downloadReportPdf);
router.post('/reports', authenticate, authorize('admin'), reportController.createLabReport);

// --- HEALTH PACKAGES ---
router.get('/packages', packageController.getPackages);
router.get('/packages/:id', packageController.getPackageById);

// --- CONTENT & INQUIRIES ---
router.get('/testimonials', contentController.getTestimonials);
router.post('/inquiries',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('message').notEmpty().withMessage('Message is required')
  ],
  validateRequest,
  contentController.createInquiry
);

// --- ADMIN SYSTEM ---
router.get('/admin/stats', authenticate, authorize('admin'), adminController.getStats);

export default router;
