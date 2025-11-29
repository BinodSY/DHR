import express from "express";
import {
    recordVitals,
    getPatientVitals,
    getLatestVitals,
    getVitalsByMedicalRecord,
    updateVitals,
    getVitalsById,
    getVitalsTrends
} from "../controllers/vitalsController.js";

const router = express.Router();

/**
 * Vitals Routes
 * Base path: /api/vitals
 */

// Record new vitals
router.post("/", recordVitals);

// Get vitals by ID
router.get("/:vitalsId", getVitalsById);

// Get patient vitals history
router.get("/patient/:patientId", getPatientVitals);

// Get latest vitals for a patient
router.get("/patient/:patientId/latest", getLatestVitals);

// Get vitals trends for a patient
router.get("/patient/:patientId/trends", getVitalsTrends);

// Get vitals by medical record
router.get("/medical-record/:recordId", getVitalsByMedicalRecord);

// Update vitals
router.put("/:vitalsId", updateVitals);

export default router;
