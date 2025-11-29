import express from "express";
import {
    createPrescription,
    getPatientPrescriptions,
    getMedicalRecordPrescriptions,
    getPrescriptionById,
    updatePrescription,
    deletePrescription,
    createBulkPrescriptions
} from "../controllers/prescriptionController.js";

const router = express.Router();

/**
 * Prescription Routes
 * Base path: /api/prescription
 */

// Create prescription
router.post("/", createPrescription);

// Create multiple prescriptions
router.post("/bulk", createBulkPrescriptions);

// Get prescription by ID
router.get("/:prescriptionId", getPrescriptionById);

// Get prescriptions for a patient
router.get("/patient/:patientId", getPatientPrescriptions);

// Get prescriptions for a medical record
router.get("/medical-record/:recordId", getMedicalRecordPrescriptions);

// Update prescription
router.put("/:prescriptionId", updatePrescription);

// Delete prescription
router.delete("/:prescriptionId", deletePrescription);

export default router;
