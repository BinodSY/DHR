import express from "express";
import {
    getPatientById,
    getPatientByHealthId,
    getPatientHistory,
    updatePatient,
    getPatientStats
} from "../controllers/patientController.js";

const router = express.Router();

/**
 * Patient Routes
 * Base path: /api/patient
 */

// Get patient by ID
router.get("/:patientId", getPatientById);

// POST patient by Health ID
router.post("/health-id", getPatientByHealthId);

// Get patient medical history
router.get("/:patientId/history", getPatientHistory);

// Get patient statistics
router.get("/:patientId/stats", getPatientStats);

// Update patient information
router.put("/:patientId", updatePatient);

export default router;
