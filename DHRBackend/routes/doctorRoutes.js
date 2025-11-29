import express from "express";
import {
    loginDoctor,
    getDoctorProfile,
    updateDoctorProfile,
    getDoctorStats
} from "../controllers/doctorController.js";

const router = express.Router();

/**
 * Doctor Routes
 * Base path: /api/doctor
 */

// Authentication
router.post("/login", loginDoctor);

// Profile management
router.get("/profile/:doctorId", getDoctorProfile);
router.put("/profile/:doctorId", updateDoctorProfile);

// Statistics
router.get("/:doctorId/stats", getDoctorStats);

export default router;
