import express from "express";
import {
    createMedicalRecord,
    getPatientMedicalRecords,
    getActiveMedicalRecord,
    getMedicalRecordById,
    updateMedicalRecord,
    addFileToMedicalRecord,
    completeMedicalRecord,
    getDoctorMedicalRecords,
    getComprehensiveMedicalRecord
} from "../controllers/medicalRecordController.js";

const router = express.Router();

/**
 * Medical Record Routes
 * Base path: /api/medical-record
 */

// Create medical record
router.post("/", createMedicalRecord);

// Get medical record by ID
router.get("/:recordId", getMedicalRecordById);

// Get comprehensive medical record with all related data
router.get("/:recordId/comprehensive", getComprehensiveMedicalRecord);

// Get patient medical records
router.get("/patient/:patientId", getPatientMedicalRecords);

// Get active medical record for a patient
router.get("/patient/:patientId/active", getActiveMedicalRecord);

// Get doctor medical records
router.get("/doctor/:doctorId", getDoctorMedicalRecords);

// Update medical record
router.put("/:recordId", updateMedicalRecord);

// Add file upload to medical record
router.post("/:recordId/upload", addFileToMedicalRecord);

// Complete/close medical record
router.post("/:recordId/complete", completeMedicalRecord);

export default router;
